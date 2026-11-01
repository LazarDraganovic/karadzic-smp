// ============================================================
//  Deep zone rules
//    y >= -64             : normal world (normal generation, bedrock at -64)
//    -1800 < y < -64      : void (void damage, building denied)
//    -2032 <= y <= -1800  : safe zone (no damage, building allowed,
//                           two bedrock layers at -2032 and -2031)
// ============================================================
(function () {
    const VOID_TOP = -64;       // void starts below this Y
    const SAFE_TOP = -1800;     // safe zone: y <= SAFE_TOP
    const VOID_DAMAGE = 4.0;    // same as vanilla void damage (per tick)

    function inVoid(y) {
        return y < VOID_TOP && y > SAFE_TOP;
    }

    ServerEvents.tick(event => {
        for (const level of event.server.allLevels) {
            for (const player of level.players) {
                if (!inVoid(player.y)) {
                    continue;
                }
                try {
                    player.damage(VOID_DAMAGE, player.damageSources().outOfWorld());
                } catch (e) {
                    player.damage(VOID_DAMAGE);
                }
            }
        }
    });

    BlockEvents.placed(event => {
        if (inVoid(event.block.y)) {
            event.cancel();
        }
    });
})();
