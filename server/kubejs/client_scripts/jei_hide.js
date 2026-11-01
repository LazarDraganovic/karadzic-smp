// Hide all items whose recipes were removed (no longer obtainable)
RecipeViewerEvents.removeEntries('item', event => {
    const hidden = [
        // ProjectE: dark / red matter gear
        'projecte:dm_hammer',
        'projecte:dm_shears',
        'projecte:rm_sword',
        'projecte:rm_pick',
        'projecte:rm_axe',
        'projecte:rm_shovel',
        'projecte:rm_hoe',
        'projecte:rm_hammer',
        'projecte:rm_shears',
        'projecte:rm_helmet',
        'projecte:rm_chestplate',
        'projecte:rm_leggings',
        'projecte:rm_boots',
        // ProjectE: gem armor
        'projecte:gem_helmet',
        'projecte:gem_chestplate',
        'projecte:gem_leggings',
        'projecte:gem_boots',
        // Project Expansion: collectors above the yellow cap
        'projectexpansion:orange_collector',
        'projectexpansion:white_collector',
        'projectexpansion:fading_collector',
        'projectexpansion:final_collector',
        // Project Expansion: relays above the cyan cap
        'projectexpansion:green_relay',
        'projectexpansion:lime_relay',
        'projectexpansion:yellow_relay',
        'projectexpansion:orange_relay',
        'projectexpansion:white_relay',
        'projectexpansion:fading_relay',
        'projectexpansion:final_relay',
        // Project Expansion: compressed collectors above the cap
        'projectexpansion:orange_compressed_collector',
        'projectexpansion:white_compressed_collector',
        'projectexpansion:fading_compressed_collector',
        'projectexpansion:final_compressed_collector',
        // Project Expansion: all Power Flowers
        'projectexpansion:basic_power_flower',
        'projectexpansion:dark_power_flower',
        'projectexpansion:red_power_flower',
        'projectexpansion:magenta_power_flower',
        'projectexpansion:pink_power_flower',
        'projectexpansion:purple_power_flower',
        'projectexpansion:violet_power_flower',
        'projectexpansion:blue_power_flower',
        'projectexpansion:cyan_power_flower',
        'projectexpansion:green_power_flower',
        'projectexpansion:lime_power_flower',
        'projectexpansion:yellow_power_flower',
        'projectexpansion:orange_power_flower',
        'projectexpansion:white_power_flower',
        'projectexpansion:fading_power_flower',
        'projectexpansion:final_power_flower'
    ];

    hidden.forEach(id => event.remove(id));
});