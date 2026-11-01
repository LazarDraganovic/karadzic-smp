// ============================================================
//  Progression / recipe removals
//  Added recipes live in kubejs/data/kubejs/recipe/progression/
// ============================================================
ServerEvents.recipes(event => {

    const remove = [];

    // ---------- Avaritia ----------
    remove.push('avaritia:infinity_ingot');

    // ---------- ProjectE: condensers / transmutation ----------
    remove.push(
        'projecte:condenser_mk1',
        'projecte:condenser_mk2',
        'projecte:transmutation_table',
        'projecte:transmutation_tablet'
    );
    remove.push('projectexpansion:condenser_mk3');

    // ---------- Draconic Evolution: awakened core (TF carminite gate) ----------
    remove.push('draconicevolution:components/awakened_core');

    // ---------- ProjectE: dark / red matter gear (replaced) ----------
    [
        'dm_sword', 'dm_pick', 'dm_axe', 'dm_shovel', 'dm_hoe', 'dm_hammer', 'dm_shears',
        'dm_helmet', 'dm_chestplate', 'dm_leggings', 'dm_boots'
    ].forEach(i => remove.push('projecte:' + i));

    [
        'rm_sword', 'rm_pick', 'rm_axe', 'rm_shovel', 'rm_hoe', 'rm_hammer', 'rm_shears',
        'rm_helmet', 'rm_chestplate', 'rm_leggings', 'rm_boots'
    ].forEach(i => remove.push('projecte:' + i));

    // ---------- ProjectE: gem armor (removed completely) ----------
    [
        'gem_helmet', 'gem_chestplate', 'gem_leggings', 'gem_boots',
        'full_star_gem_helmet', 'full_star_gem_chestplate',
        'full_star_gem_leggings', 'full_star_gem_boots'
    ].forEach(i => remove.push('projecte:' + i));

    // ---------- ProjectE: watch of flowing time (replaced) ----------
    remove.push('projecte:watch_of_flowing_time');

    // ---------- Project Expansion: collectors / relays ----------
    const tiers = [
        'basic', 'dark', 'red', 'magenta', 'pink', 'purple', 'violet', 'blue',
        'cyan', 'green', 'lime', 'yellow', 'orange', 'white', 'fading', 'final'
    ];
    tiers.forEach(t => {
        remove.push('projectexpansion:collector/' + t);
        remove.push('projectexpansion:relay/' + t);
    });

    // ProjectE -> Project Expansion conversions (bypass the gate)
    remove.push(
        'projectexpansion:collector/mk1_conversion',
        'projectexpansion:collector/mk2_conversion',
        'projectexpansion:collector/mk3_conversion',
        'projectexpansion:relay/mk1_conversion',
        'projectexpansion:relay/mk2_conversion',
        'projectexpansion:relay/mk3_conversion'
    );

    // compressed collectors above the yellow cap
    ['orange', 'white', 'fading', 'final'].forEach(t => {
        remove.push('projectexpansion:collector/compressed/' + t);
    });

    // Power Flowers — removed completely (recipes + upgrades)
    tiers.forEach(t => remove.push('projectexpansion:power_flower/' + t));
    tiers.filter(t => t !== 'basic').forEach(t => remove.push('projectexpansion:power_flower/' + t + '_upgrade'));

    remove.forEach(id => event.remove({ id: id }));

    console.info('[progression] removed ' + remove.length + ' vanilla/mod recipes');
});
