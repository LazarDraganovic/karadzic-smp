// ============================================================
//  World border (every dimension): -12000 .. 12000
//  + dragon egg drop after every Ender Dragon kill
// ============================================================
(function () {
    const BORDER_SIZE = 24000; // diameter => 12000 blocks from 0,0 in each direction
    const VANILLA_DIMS = ['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end'];
    const EXTRA_DIMS = ['twilightforest:twilight_forest'];

    function applyToLevel(level) {
        const wb = level.worldBorder;
        wb.setCenter(0, 0);
        wb.setSize(BORDER_SIZE);
    }

    ServerEvents.loaded(event => {
        const server = event.server;
        let count = 0;

        try {
            for (const level of server.allLevels) {
                applyToLevel(level);
                count++;
            }
        } catch (e) {
            console.error('[world_rules] failed to iterate levels: ' + e);
        }

        if (count === 0) {
            // fallback - run the command in each known dimension
            VANILLA_DIMS.concat(EXTRA_DIMS).forEach(dim => {
                server.runCommandSilent('execute in ' + dim + ' run worldborder center 0 0');
                server.runCommandSilent('execute in ' + dim + ' run worldborder set ' + BORDER_SIZE);
            });
        }

        console.info('[world_rules] world border set to ' + BORDER_SIZE + ' blocks');
    });

    EntityEvents.death('minecraft:ender_dragon', event => {
        const e = event.entity;
        event.server.runCommandSilent(
            'execute in minecraft:the_end run summon minecraft:item ' +
            e.x + ' ' + e.y + ' ' + e.z +
            ' {Item:{id:"minecraft:dragon_egg",count:1},PickupDelay:0}'
        );
    });
})();
