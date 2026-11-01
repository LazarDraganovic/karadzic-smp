// ============================================================
//  Chaos Island respawn
//  After the chaos crystal is collected, the island state is
//  restored (crystal + guardian fight + leftover entities) as
//  soon as no player has been on the island for a while.
// ============================================================
(function () {
    var ISLAND_DIM = 'minecraft:the_end';
    var ISLAND_RADIUS = 300;
    var IDLE_TICKS = 1200;
    var DATA_KEY = 'kubejs_chaos_pending';

    function findIslandLevel(server) {
        try {
            var it = server.allLevels.iterator();
            while (it.hasNext()) {
                var level = it.next();
                if (String(level.dimension) === ISLAND_DIM) {
                    return level;
                }
            }
        } catch (e) {}
        try {
            return server.getLevel(ISLAND_DIM);
        } catch (e) {
            return null;
        }
    }

    function load(server) {
        try {
            var raw = server.persistentData.getString(DATA_KEY);
            if (raw && raw.length > 0) {
                return JSON.parse(raw);
            }
        } catch (e) {
            console.error('[chaos_reset] failed to read pending data: ' + e);
        }
        return [];
    }

    function save(server, list) {
        server.persistentData.putString(DATA_KEY, JSON.stringify(list));
    }

    function playersNear(level, x, z) {
        if (!level) {
            return false;
        }
        var r2 = ISLAND_RADIUS * ISLAND_RADIUS;
        var it = level.players.iterator();
        while (it.hasNext()) {
            var p = it.next();
            var dx = p.x - x;
            var dz = p.z - z;
            if (dx * dx + dz * dz <= r2) {
                return true;
            }
        }
        return false;
    }

    function restoreIsland(server, e) {
        var x = e.x;
        var y = e.y;
        var z = e.z;
        var fx = x - 16;
        var fz = z - 16;
        var tx = x + 16;
        var tz = z + 16;

        server.runCommandSilent('execute in ' + ISLAND_DIM + ' run forceload add ' + fx + ' ' + fz + ' ' + tx + ' ' + tz);

        server.runCommandSilent(
            'execute in ' + ISLAND_DIM + ' run kill @e[type=!minecraft:player,x=' + x + ',y=' + y + ',z=' + z +
            ',distance=..' + ISLAND_RADIUS + ']'
        );

        server.runCommandSilent(
            'execute in ' + ISLAND_DIM + ' run setblock ' + x + ' ' + y + ' ' + z + ' draconicevolution:chaos_crystal'
        );

        server.runCommandSilent(
            'execute in ' + ISLAND_DIM + ' positioned ' + (x + 0.5) + ' ' + y + ' ' + (z + 0.5) +
            ' run respawn_draconic_guardian'
        );

        server.runCommandSilent('execute in ' + ISLAND_DIM + ' run forceload remove ' + fx + ' ' + fz + ' ' + tx + ' ' + tz);

        console.info('[chaos_reset] island restored at ' + x + ' ' + y + ' ' + z);
    }

    BlockEvents.broken('draconicevolution:chaos_crystal', function (event) {
        var server = event.server;
        var pos = event.block.pos;

        var pending = load(server);
        var keep = [];
        for (var i = 0; i < pending.length; i++) {
            var e = pending[i];
            if (!(e.x === pos.x && e.y === pos.y && e.z === pos.z)) {
                keep.push(e);
            }
        }
        keep.push({ x: pos.x, y: pos.y, z: pos.z, idle: 0 });
        save(server, keep);

        console.info('[chaos_reset] chaos crystal collected at ' + pos.x + ' ' + pos.y + ' ' + pos.z + ', reset queued');
    });

    ServerEvents.tick(function (event) {
        var server = event.server;
        if (server.tickCount % 20 !== 0) {
            return;
        }

        var pending = load(server);
        if (pending.length === 0) {
            return;
        }

        var level = findIslandLevel(server);
        var keep = [];
        var changed = false;

        for (var i = 0; i < pending.length; i++) {
            var e = pending[i];
            if (playersNear(level, e.x, e.z)) {
                if (e.idle !== 0) {
                    e.idle = 0;
                    changed = true;
                }
                keep.push(e);
                continue;
            }

            e.idle = (e.idle || 0) + 20;
            changed = true;

            if (e.idle >= IDLE_TICKS) {
                try {
                    restoreIsland(server, e);
                } catch (err) {
                    console.error('[chaos_reset] restore failed: ' + err);
                }
            } else {
                keep.push(e);
            }
        }

        if (changed) {
            save(server, keep);
        }
    });
})();
