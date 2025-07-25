document.addEventListener("DOMContentLoaded", () => {
  const BASE = "/api/minecraft";
  const output = document.getElementById("output");
  const container = document.getElementById("api-sections");
  const endpoints = {
    "1.20.2": {
      Biomes: [
        { label: "All Biomes", path: "versions/1.20.2/biomes" },
        { label: "By ID", path: "versions/1.20.2/biomes/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/biomes/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.2/biomes/displayName/:displayName", param: ["displayName"] },
        { label: "By Category", path: "versions/1.20.2/biomes/filter/category/:category", param: ["category"] },
        { label: "By Temperature", path: "versions/1.20.2/biomes/filter/temperature/:temperature", param: ["temperature"] },
        { label: "By Precipitation", path: "versions/1.20.2/biomes/filter/precipitation/:precipitation", param: ["precipitation"] },
        { label: "By Dimension", path: "versions/1.20.2/biomes/filter/dimension/:dimension", param: ["dimension"] },
        { label: "By Color", path: "versions/1.20.2/biomes/filter/color/:color", param: ["color"] },
      ],
      BlockCollisionShapes: [
        { label: "All Block Collision Shapes", path: "versions/1.20.2/blockColissionShapes" },
        { label: "Blocks", path: "versions/1.20.2/blockColissionShapes/blocks" },
        { label: "Shapes", path: "versions/1.20.2/blockColissionShapes/shapes" },
      ],
      Blocks: [
        { label: "All Blocks", path: "versions/1.20.2/blocks" },
        { label: "By ID", path: "versions/1.20.2/blocks/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/blocks/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.2/blocks/displayname/:displayName", param: ["displayName"] },

        { label: "Filter by Hardness", path: "versions/1.20.2/blocks/filter/hardness/:hardness", param: ["hardness"] },
        { label: "Filter by Resistance", path: "versions/1.20.2/blocks/filter/resistance/:resistance", param: ["resistance"] },
        { label: "Filter by Stack Size", path: "versions/1.20.2/blocks/filter/stacksize/:stacksize", param: ["stacksize"] },
        { label: "Filter by Diggable", path: "versions/1.20.2/blocks/filter/diggable/:diggable", param: ["diggable"] },
        { label: "Filter by Material", path: "versions/1.20.2/blocks/filter/material/:material", param: ["material"] },
        { label: "Filter by Transparent", path: "versions/1.20.2/blocks/filter/transparent/:transparent", param: ["transparent"] },
        { label: "Filter by Emit Light", path: "versions/1.20.2/blocks/filter/emitlight/:emitlight", param: ["emitlight"] },
        { label: "Filter by Filter Light", path: "versions/1.20.2/blocks/filter/filterlight/:filterlight", param: ["filterlight"] },
        { label: "Filter by Default State", path: "versions/1.20.2/blocks/filter/defaultstate/:defaultstate", param: ["defaultstate"] },
        { label: "Filter by Min State ID", path: "versions/1.20.2/blocks/filter/minstateid/:minstateid", param: ["minstateid"] },
        { label: "Filter by Max State ID", path: "versions/1.20.2/blocks/filter/maxstateid/:maxstateid", param: ["maxstateid"] },
        { label: "Filter by Bounding Box", path: "versions/1.20.2/blocks/filter/boundingbox/:boundingbox", param: ["boundingbox"] },
      ],
      Commands: [
        { label: "All Commands", path: "versions/1.20.2/commands" },
        { label: "Root Commands", path: "versions/1.20.2/commands/root" },
        { label: "All Parsers", path: "versions/1.20.2/commands/parsers" },
        { label: "Parser by Name", path: "versions/1.20.2/commands/parsers/:name", param: ["name"] },
        { label: "All Modifiers", path: "versions/1.20.2/commands/modifiers" },
        { label: "Children Recursive", path: "versions/1.20.2/commands/children" },
        { label: "Find Node by Name", path: "versions/1.20.2/commands/node/:name", param: ["name"] },
      ],
      Effects: [
        { label: "All Effects", path: "versions/1.20.2/effects" },
        { label: "By ID", path: "versions/1.20.2/effects/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/effects/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.2/effects/displayname/:displayname", param: ["displayname"] },
        { label: "Filter by Type", path: "versions/1.20.2/effects/filter/type/:type", param: ["type"] },
      ],
      Enchantments: [
        { label: "All Enchantments", path: "versions/1.20.2/enchantments" },
        { label: "By ID", path: "versions/1.20.2/enchantments/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/enchantments/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.2/enchantments/display_name/:display_name", param: ["display_name"] },

        { label: "Filter by Max Level", path: "versions/1.20.2/enchantments/filter/max_level/:max_level", param: ["max_level"] },
        { label: "Filter by Treasure Only", path: "versions/1.20.2/enchantments/filter/treasureonly/:treasureonly", param: ["treasureonly"] },
        { label: "Filter by Curse", path: "versions/1.20.2/enchantments/filter/curse/:curse", param: ["curse"] },
        { label: "Filter by Category", path: "versions/1.20.2/enchantments/filter/category/:category", param: ["category"] },
        { label: "Filter by Weight", path: "versions/1.20.2/enchantments/filter/weight/:weight", param: ["weight"] },
        { label: "Filter by Tradeable", path: "versions/1.20.2/enchantments/filter/tradeable/:tradeable", param: ["tradeable"] },
        { label: "Filter by Discoverable", path: "versions/1.20.2/enchantments/filter/discoverable/:discoverable", param: ["discoverable"] },
      ],
      Entities: [
        { label: "All Entities", path: "versions/1.20.2/entities" },
        { label: "By ID", path: "versions/1.20.2/entities/id/:id", param: ["id"] },
        { label: "By Internal ID", path: "versions/1.20.2/entities/internalId/:internalId", param: ["internalId"] },
        { label: "By Name", path: "versions/1.20.2/entities/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.2/entities/displayName/:displayName", param: ["displayName"] },
        { label: "Filter by Type", path: "versions/1.20.2/entities/filter/type/:type", param: ["type"] },
        { label: "Filter by Category", path: "versions/1.20.2/entities/filter/category/:category", param: ["category"] },
      ],
      Foods: [
        { label: "All Foods", path: "versions/1.20.2/foods" },
        { label: "By ID", path: "versions/1.20.2/foods/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/foods/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.2/foods/displayname/:displayname", param: ["displayname"] },
        { label: "Filter by Stack Size", path: "versions/1.20.2/foods/filter/stacksize/:stacksize", param: ["stacksize"] },
      ],
      Instruments: [
        { label: "All Instruments", path: "versions/1.20.2/instruments" },
        { label: "By ID", path: "versions/1.20.2/instruments/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/instruments/name/:name", param: ["name"] },
      ],
      Items: [
        { label: "All Items", path: "versions/1.20.2/items" },
        { label: "By ID", path: "versions/1.20.2/items/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/items/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.2/items/displayname/:displayname", param: ["displayname"] },
        { label: "Filter by Stack Size", path: "versions/1.20.2/items/filter/stacksize/:stackSize", param: ["stackSize"] },
      ],
      Language: [{ label: "All Languages", path: "versions/1.20.2/language" }],
      LoginPacket: [{ label: "All Login Packets", path: "versions/1.20.2/loginPacket" }],
      MapIcons: [
        { label: "All Map Icons", path: "versions/1.20.2/mapIcons" },
        { label: "By ID", path: "versions/1.20.2/mapIcons/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/mapIcons/name/:name", param: ["name"] },
        { label: "By Appearance", path: "versions/1.20.2/mapIcons/appearance/:appearance", param: ["appearance"] },
        { label: "Filter by Visible In Item Frame", path: "versions/1.20.2/mapIcons/visible/:visible", param: ["visible"] },
      ],
      Materials: [
        { label: "All Materials", path: "versions/1.20.2/materials" },
        { label: "Default", path: "versions/1.20.2/materials/default" },
        { label: "Leaves", path: "versions/1.20.2/materials/leaves" },
        { label: "CoWeb", path: "versions/1.20.2/materials/coWeb" },
        { label: "Plant", path: "versions/1.20.2/materials/plant" },
        { label: "Gourd", path: "versions/1.20.2/materials/gourd" },
        { label: "Vine or Glow Lichen", path: "versions/1.20.2/materials/vine_or_glow_lichen" },
        { label: "Wool", path: "versions/1.20.2/materials/wool" },
        { label: "Sword Instantly Mines", path: "versions/1.20.2/materials/sword_Instantly_Mines" },
        { label: "Sword Efficient", path: "versions/1.20.2/materials/sword_efficient" },
        { label: "Incorrect for Wooden Tool", path: "versions/1.20.2/materials/incorrect_for_wooden_tool" },
        { label: "Mineable Shovel", path: "versions/1.20.2/materials/mineableShovel" },
        { label: "Mineable Pickaxe", path: "versions/1.20.2/materials/mineablePickaxe" },
        { label: "Mineable Axe", path: "versions/1.20.2/materials/mineableAxe" },
        { label: "Mineable Hoe", path: "versions/1.20.2/materials/mineableHoe" },
        { label: "Incorrect for Stone Tool", path: "versions/1.20.2/materials/incorrect_for_stone_tool" },
        { label: "Incorrect for Gold Tool", path: "versions/1.20.2/materials/incorrect_for_gold_tool" },
        { label: "Incorrect for Iron Tool", path: "versions/1.20.2/materials/incorrect_for_iron_tool" },
        { label: "Incorrect for Diamond Tool", path: "versions/1.20.2/materials/incorrect_for_diamond_tool" },
        { label: "Incorrect for Netherite Tool", path: "versions/1.20.2/materials/incorrect_for_netherite_tool" },
        { label: "Plant Mineable Axe", path: "versions/1.20.2/materials/plantMineableAxe" },
        { label: "Gourd Mineable Axe", path: "versions/1.20.2/materials/gourdMineableAxe" },
        { label: "Leaves Mineable Hoe", path: "versions/1.20.2/materials/leavesMineableHoe" },
        { label: "Leaves Mineable Axe Mineable Hoe", path: "versions/1.20.2/materials/leavesMineableAxeMineableHoe" },
        { label: "Vine or Glow Lichen Plant Mineable Axe", path: "versions/1.20.2/materials/vine_or_glow_lichenPlantMineableAxe" },
      ],
      Particles: [
        { label: "All Particles", path: "versions/1.20.2/particles" },
        { label: "By ID", path: "versions/1.20.2/particles/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/particles/name/:name", param: ["name"] },
      ],
      Protocol: [{ label: "All Protocols", path: "versions/1.20.2/protocol" }],
      Recipes: [
        { label: "All Recipes", path: "versions/1.20.2/recipes" },
        { label: "By Result ID", path: "versions/1.20.2/recipes/resultId/:resultId", param: ["resultId"] },
        { label: "By Ingredient ID", path: "versions/1.20.2/recipes/ingredientId/:ingredientId", param: ["ingredientId"] },
      ],
      Sounds: [
        { label: "All Sounds", path: "versions/1.20.2/sounds" },
        { label: "By ID", path: "versions/1.20.2/sounds/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.2/sounds/name/:name", param: ["name"] },
      ],
      Tints: [
        { label: "All Tints", path: "versions/1.20.2/tints" },
        { label: "Constant", path: "versions/1.20.2/tints/constant" },
        { label: "Foliage", path: "versions/1.20.2/tints/foliage" },
        { label: "Grass", path: "versions/1.20.2/tints/grass" },
        { label: "Redstone", path: "versions/1.20.2/tints/redstone" },
        { label: "Water", path: "versions/1.20.2/tints/water" },
      ],
    },
    "1.20.3": {
      BlockCollisionShapes: [
        {
          label: "All Block Collision Shapes",
          path: "versions/1.20.3/blockColissionShapes",
        },
        {
          label: "Blocks",
          path: "versions/1.20.3/blockColissionShapes/blocks",
        },
        {
          label: "Shapes",
          path: "versions/1.20.3/blockColissionShapes/shapes",
        },
      ],
      Blocks: [
        { label: "All Blocks", path: "versions/1.20.3/blocks" },
        { label: "By ID", path: "versions/1.20.3/blocks/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.3/blocks/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.3/blocks/displayname/:displayName", param: ["displayName"] },

        { label: "Filter by Hardness", path: "versions/1.20.3/blocks/filter/hardness/:hardness", param: ["hardness"] },
        { label: "Filter by Resistance", path: "versions/1.20.3/blocks/filter/resistance/:resistance", param: ["resistance"] },
        { label: "Filter by Stack Size", path: "versions/1.20.3/blocks/filter/stacksize/:stacksize", param: ["stacksize"] },
        { label: "Filter by Diggable", path: "versions/1.20.3/blocks/filter/diggable/:diggable", param: ["diggable"] },
        { label: "Filter by Material", path: "versions/1.20.3/blocks/filter/material/:material", param: ["material"] },
        { label: "Filter by Transparent", path: "versions/1.20.3/blocks/filter/transparent/:transparent", param: ["transparent"] },
        { label: "Filter by Emit Light", path: "versions/1.20.3/blocks/filter/emitlight/:emitlight", param: ["emitlight"] },
        { label: "Filter by Filter Light", path: "versions/1.20.3/blocks/filter/filterlight/:filterlight", param: ["filterlight"] },
        { label: "Filter by Default State", path: "versions/1.20.3/blocks/filter/defaultstate/:defaultstate", param: ["defaultstate"] },
        { label: "Filter by Min State ID", path: "versions/1.20.3/blocks/filter/minstateid/:minstateid", param: ["minstateid"] },
        { label: "Filter by Max State ID", path: "versions/1.20.3/blocks/filter/maxstateid/:maxstateid", param: ["maxstateid"] },
        { label: "Filter by Bounding Box", path: "versions/1.20.3/blocks/filter/boundingbox/:boundingbox", param: ["boundingbox"] },
      ],
      Commands: [
        { label: "All Commands", path: "versions/1.20.3/commands" },
        { label: "Root Commands", path: "versions/1.20.3/commands/root" },
        { label: "All Parsers", path: "versions/1.20.3/commands/parsers" },
        { label: "Parser by Name", path: "versions/1.20.3/commands/parsers/:name", param: ["name"] },
        { label: "All Modifiers", path: "versions/1.20.3/commands/modifiers" },
        { label: "Children Recursive", path: "versions/1.20.3/commands/children" },
        { label: "Find Node by Name", path: "versions/1.20.3/commands/node/:name", param: ["name"] },
      ],
      Entities: [
        { label: "All Entities", path: "versions/1.20.3/entities" },
        { label: "By ID", path: "versions/1.20.3/entities/id/:id", param: ["id"] },
        { label: "By Internal ID", path: "versions/1.20.3/entities/internalId/:internalId", param: ["internalId"] },
        { label: "By Name", path: "versions/1.20.3/entities/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.3/entities/displayName/:displayName", param: ["displayName"] },
        { label: "Filter by Type", path: "versions/1.20.3/entities/filter/type/:type", param: ["type"] },
        { label: "Filter by Category", path: "versions/1.20.3/entities/filter/category/:category", param: ["category"] },
      ],
      Foods: [
        { label: "All Foods", path: "versions/1.20.3/foods" },
        { label: "By ID", path: "versions/1.20.3/foods/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.3/foods/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.3/foods/displayname/:displayname", param: ["displayname"] },
        { label: "Filter by Stack Size", path: "versions/1.20.3/foods/filter/stacksize/:stacksize", param: ["stacksize"] },
      ],
      Items: [
        { label: "All Items", path: "versions/1.20.3/items" },
        { label: "By ID", path: "versions/1.20.3/items/id/:id", param: ["id"] },
        { label: "By Name", path: "versions/1.20.3/items/name/:name", param: ["name"] },
        { label: "By Display Name", path: "versions/1.20.3/items/displayname/:displayname", param: ["displayname"] },
        { label: "Filter by Stack Size", path: "versions/1.20.3/items/filter/stacksize/:stackSize", param: ["stackSize"] },
      ],
      Language: [{ label: "All Languages", path: "versions/1.20.3/language" }],
      LoginPacket: [{ label: "All Login Packets", path: "versions/1.20.3/loginPacket" }],
      Materials: [
        { label: "All Materials", path: "materials" },
        { label: "Default", path: "materials/default" },
        { label: "Leaves", path: "materials/leaves" },
        { label: "CoWeb", path: "materials/coWeb" },
        { label: "Plant", path: "materials/plant" },
        { label: "Gourd", path: "materials/gourd" },
        { label: "Vine or Glow Lichen", path: "materials/vine_or_glow_lichen" },
        { label: "Wool", path: "materials/wool" },
        { label: "Sword Instantly Mines", path: "materials/sword_Instantly_Mines" },
        { label: "Sword Efficient", path: "materials/sword_efficient" },
        { label: "Incorrect for Wooden Tool", path: "materials/incorrect_for_wooden_tool" },
        { label: "Mineable Shovel", path: "materials/mineableShovel" },
        { label: "Mineable Pickaxe", path: "materials/mineablePickaxe" },
        { label: "Mineable Axe", path: "materials/mineableAxe" },
        { label: "Mineable Hoe", path: "materials/mineableHoe" },
        { label: "Incorrect for Stone Tool", path: "materials/incorrect_for_stone_tool" },
        { label: "Incorrect for Gold Tool", path: "materials/incorrect_for_gold_tool" },
        { label: "Incorrect for Iron Tool", path: "materials/incorrect_for_iron_tool" },
        { label: "Incorrect for Diamond Tool", path: "materials/incorrect_for_diamond_tool" },
        { label: "Incorrect for Netherite Tool", path: "materials/incorrect_for_netherite_tool" },
        { label: "Plant Mineable Axe", path: "materials/plantMineableAxe" },
        { label: "Gourd Mineable Axe", path: "materials/gourdMineableAxe" },
        { label: "Leaves Mineable Hoe", path: "materials/leavesMineableHoe" },
        { label: "Leaves Mineable Axe Mineable Hoe", path: "materials/leavesMineableAxeMineableHoe" },
        { label: "Vine or Glow Lichen Plant Mineable Axe", path: "materials/vine_or_glow_lichenPlantMineableAxe" },
      ],
      Particles: [
        { label: "All Particles", path: "particles" },
        { label: "By ID", path: "particles/id/:id", param: ["id"] },
        { label: "By Name", path: "particles/name/:name", param: ["name"] },
      ],
      Protocol: [{ label: "All Protocols", path: "protocol" }],
      Recipes: [
        { label: "All Recipes", path: "recipes" },
        { label: "By Result ID", path: "recipes/resultId/:resultId", param: ["resultId"] },
        { label: "By Ingredient ID", path: "recipes/ingredientId/:ingredientId", param: ["ingredientId"] },
      ],
    },
    "1.20.4": {
      blocks: [
        { label: "All Blocks", path: "versions/1.20.4/blocks" },
        { label: "By ID", path: "versions/1.20.4/blocks/id/:id", param: "id" },
        { label: "By Name", path: "versions/1.20.4/blocks/name/:name", param: "name" },
        { label: "By Display Name", path: "versions/1.20.4/blocks/displayname/:displayName", param: "displayName" },
        { label: "Filter by Hardness", path: "versions/1.20.4/blocks/filter/hardness/:hardness", param: "hardness" },
        { label: "Filter by Resistance", path: "versions/1.20.4/blocks/filter/resistance/:resistance", param: "resistance" },
        { label: "Filter by Stack Size", path: "versions/1.20.4/blocks/filter/stacksize/:stacksize", param: "stacksize" },
        { label: "Filter by Diggable", path: "versions/1.20.4/blocks/filter/diggable/:diggable", param: "diggable" },
        { label: "Filter by Material", path: "versions/1.20.4/blocks/filter/material/:material", param: "material" },
        { label: "Filter by Transparent", path: "versions/1.20.4/blocks/filter/transparent/:transparent", param: "transparent" },
        { label: "Filter by Emit Light", path: "versions/1.20.4/blocks/filter/emitlight/:emitlight", param: "emitlight" },
        { label: "Filter by Filter Light", path: "versions/1.20.4/blocks/filter/filterlight/:filterlight", param: "filterlight" },
        { label: "Filter by Default State", path: "versions/1.20.4/blocks/filter/defaultstate/:defaultstate", param: "defaultstate" },
        { label: "Filter by Min State ID", path: "versions/1.20.4/blocks/filter/minstateid/:minstateid", param: "minstateid" },
        { label: "Filter by Max State ID", path: "versions/1.20.4/blocks/filter/maxstateid/:maxstateid", param: "maxstateid" },
        { label: "Filter by Bounding Box", path: "versions/1.20.4/blocks/filter/boundingbox/:boundingbox", param: "boundingbox" },
      ],
      sounds: [
        { label: "All Sounds", path: "versions/1.20.4/sounds" },
        { label: "By ID", path: "versions/1.20.4/sounds/id/:id", param: "id" },
        { label: "By Name", path: "versions/1.20.4/sounds/name/:name", param: "name" },
      ],
    },
    "1.20.5": {
      biomes: [
        { label: "All Biomes", path: "versions/1.20.5/biomes" },
        { label: "By ID", path: "versions/1.20.5/biomes/id/:id", param: "id" },
        { label: "By Name", path: "versions/1.20.5/biomes/name/:name", param: "name" },
        { label: "By Display Name", path: "versions/1.20.5/biomes/displayName/:displayName", param: "displayName" },
        { label: "Filter by Category", path: "versions/1.20.5/biomes/filter/category/:category", param: "category" },
        { label: "Filter by Temperature", path: "versions/1.20.5/biomes/filter/temperature/:temperature", param: "temperature" },
        { label: "Filter by Precipitation", path: "versions/1.20.5/biomes/filter/precipitation/:precipitation", param: "precipitation" },
        { label: "Filter by Dimension", path: "versions/1.20.5/biomes/filter/dimension/:dimension", param: "dimension" },
        { label: "Filter by Color", path: "versions/1.20.5/biomes/filter/color/:color", param: "color" },
      ],
      blockColissionShapes: [
        { label: "All Block Collision Shapes", path: "versions/1.20.5/blockColissionShapes" },
        { label: "Blocks", path: "versions/1.20.5/blockColissionShapes/blocks" },
        { label: "Shapes", path: "versions/1.20.5/blockColissionShapes/shapes" },
      ],
      blocks: [
        { label: "All Blocks", path: "versions/1.20.5/blocks" },
        { label: "Block by ID", path: "versions/1.20.5/blocks/id/:id", param: "id" },
        { label: "Block by Name", path: "versions/1.20.5/blocks/name/:name", param: "name" },
        { label: "Block by Display Name", path: "versions/1.20.5/blocks/displayname/:displayName", param: "displayName" },

        { label: "Filter by Hardness", path: "versions/1.20.5/blocks/filter/hardness/:hardness", param: "hardness" },
        { label: "Filter by Resistance", path: "versions/1.20.5/blocks/filter/resistance/:resistance", param: "resistance" },
        { label: "Filter by Stack Size", path: "versions/1.20.5/blocks/filter/stacksize/:stacksize", param: "stacksize" },
        { label: "Filter by Diggable", path: "versions/1.20.5/blocks/filter/diggable/:diggable", param: "diggable" },
        { label: "Filter by Material", path: "versions/1.20.5/blocks/filter/material/:material", param: "material" },
        { label: "Filter by Transparent", path: "versions/1.20.5/blocks/filter/transparent/:transparent", param: "transparent" },
        { label: "Filter by Emit Light", path: "versions/1.20.5/blocks/filter/emitlight/:emitlight", param: "emitlight" },
        { label: "Filter by Filter Light", path: "versions/1.20.5/blocks/filter/filterlight/:filterlight", param: "filterlight" },
        { label: "Filter by Default State", path: "versions/1.20.5/blocks/filter/defaultstate/:defaultstate", param: "defaultstate" },
        { label: "Filter by Min State ID", path: "versions/1.20.5/blocks/filter/minstateid/:minstateid", param: "minstateid" },
        { label: "Filter by Max State ID", path: "versions/1.20.5/blocks/filter/maxstateid/:maxstateid", param: "maxstateid" },
        { label: "Filter by Bounding Box", path: "versions/1.20.5/blocks/filter/boundingbox/:boundingbox", param: "boundingbox" },
      ],
      effects: [
        { label: "All Effects", path: "versions/1.20.5/effects" },
        { label: "Effect by ID", path: "versions/1.20.5/effects/id/:id", param: "id" },
        { label: "Effect by Name", path: "versions/1.20.5/effects/name/:name", param: "name" },
        { label: "Effect by Display Name", path: "versions/1.20.5/effects/displayname/:displayname", param: "displayname" },
        { label: "Filter by Type", path: "versions/1.20.5/effects/filter/type/:type", param: "type" },
      ],
      enchantments: [
        { label: "All Enchantments", path: "versions/1.20.5/enchantments" },
        { label: "Enchantment by ID", path: "versions/1.20.5/enchantments/id/:id", param: "id" },
        { label: "Enchantment by Name", path: "versions/1.20.5/enchantments/name/:name", param: "name" },
        { label: "Enchantment by Display Name", path: "versions/1.20.5/enchantments/display_name/:display_name", param: "display_name" },
        { label: "Filter by Max Level", path: "versions/1.20.5/enchantments/filter/max_level/:max_level", param: "max_level" },
        { label: "Filter by Treasure Only", path: "versions/1.20.5/enchantments/filter/treasureonly/:treasureonly", param: "treasureonly" },
        { label: "Filter by Curse", path: "versions/1.20.5/enchantments/filter/curse/:curse", param: "curse" },
        { label: "Filter by Category", path: "versions/1.20.5/enchantments/filter/category/:category", param: "category" },
        { label: "Filter by Weight", path: "versions/1.20.5/enchantments/filter/weight/:weight", param: "weight" },
        { label: "Filter by Tradeable", path: "versions/1.20.5/enchantments/filter/tradeable/:tradeable", param: "tradeable" },
        { label: "Filter by Discoverable", path: "versions/1.20.5/enchantments/filter/discoverable/:discoverable", param: "discoverable" },
      ],
      entities: [
        { label: "All Entities", path: "versions/1.20.5/entities" },
        { label: "Entity by ID", path: "versions/1.20.5/entities/id/:id", param: "id" },
        { label: "Entity by Internal ID", path: "versions/1.20.5/entities/internalId/:internalId", param: "internalId" },
        { label: "Entity by Name", path: "versions/1.20.5/entities/name/:name", param: "name" },
        { label: "Entity by Display Name", path: "versions/1.20.5/entities/displayName/:displayName", param: "displayName" },
        { label: "Filter by Type", path: "versions/1.20.5/entities/filter/type/:type", param: "type" },
        { label: "Filter by Category", path: "versions/1.20.5/entities/filter/category/:category", param: "category" },
      ],
      foods: [
        { label: "All Foods", path: "versions/1.20.5/foods" },
        { label: "Food by ID", path: "versions/1.20.5/foods/id/:id", param: "id" },
        { label: "Food by Name", path: "versions/1.20.5/foods/name/:name", param: "name" },
        { label: "Food by Display Name", path: "versions/1.20.5/foods/displayname/:displayname", param: "displayname" },
        { label: "Filter by Stack Size", path: "versions/1.20.5/foods/filter/stacksize/:stacksize", param: "stacksize" },
      ],
      instruments: [
        { label: "All Instruments", path: "versions/1.20.5/instruments" },
        { label: "Instrument by ID", path: "versions/1.20.5/instruments/id/:id", param: "id" },
        { label: "Instrument by Name", path: "versions/1.20.5/instruments/name/:name", param: "name" },
      ],
      items: [
        { label: "All Items", path: "versions/1.20.5/items" },
        { label: "Item by ID", path: "versions/1.20.5/items/id/:id", param: "id" },
        { label: "Item by Name", path: "versions/1.20.5/items/name/:name", param: "name" },
        { label: "Item by Display Name", path: "versions/1.20.5/items/displayname/:displayname", param: "displayname" },
        { label: "Filter Items by Stack Size", path: "versions/1.20.5/items/filter/stacksize/:stackSize", param: "stackSize" },
      ],
      language: [{ label: "All Languages", path: "versions/1.20.5/language" }],
      loginPacket: [{ label: "All Login Packets", path: "versions/1.20.5/loginPacket" }],
      materials: [
        { label: "All Materials", path: "versions/1.20.5/materials" },
        { label: "Default", path: "versions/1.20.5/materials/default" },
        { label: "Leaves", path: "versions/1.20.5/materials/leaves" },
        { label: "Cobweb", path: "versions/1.20.5/materials/coWeb" },
        { label: "Plant", path: "versions/1.20.5/materials/plant" },
        { label: "Gourd", path: "versions/1.20.5/materials/gourd" },
        { label: "Vine or Glow Lichen", path: "versions/1.20.5/materials/vine_or_glow_lichen" },
        { label: "Wool", path: "versions/1.20.5/materials/wool" },
        { label: "Sword Instantly Mines", path: "versions/1.20.5/materials/sword_Instantly_Mines" },
        { label: "Sword Efficient", path: "versions/1.20.5/materials/sword_efficient" },
        { label: "Incorrect for Wooden Tool", path: "versions/1.20.5/materials/incorrect_for_wooden_tool" },
        { label: "Mineable with Shovel", path: "versions/1.20.5/materials/mineableShovel" },
        { label: "Mineable with Pickaxe", path: "versions/1.20.5/materials/mineablePickaxe" },
        { label: "Mineable with Axe", path: "versions/1.20.5/materials/mineableAxe" },
        { label: "Mineable with Hoe", path: "versions/1.20.5/materials/mineableHoe" },
        { label: "Incorrect for Stone Tool", path: "versions/1.20.5/materials/incorrect_for_stone_tool" },
        { label: "Incorrect for Gold Tool", path: "versions/1.20.5/materials/incorrect_for_gold_tool" },
        { label: "Incorrect for Iron Tool", path: "versions/1.20.5/materials/incorrect_for_iron_tool" },
        { label: "Incorrect for Diamond Tool", path: "versions/1.20.5/materials/incorrect_for_diamond_tool" },
        { label: "Incorrect for Netherite Tool", path: "versions/1.20.5/materials/incorrect_for_netherite_tool" },
        { label: "Plant Mineable with Axe", path: "versions/1.20.5/materials/plantMineableAxe" },
        { label: "Gourd Mineable with Axe", path: "versions/1.20.5/materials/gourdMineableAxe" },
        { label: "Leaves Mineable with Hoe", path: "versions/1.20.5/materials/leavesMineableHoe" },
        { label: "Leaves Mineable with Axe and Hoe", path: "versions/1.20.5/materials/leavesMineableAxeMineableHoe" },
        { label: "Vine or Glow Lichen, Plant, Mineable with Axe", path: "versions/1.20.5/materials/vine_or_glow_lichenPlantMineableAxe" },
      ],
      particles: [
        { label: "All Particles", path: "versions/1.20.5/particles" },
        { label: "By ID", path: "versions/1.20.5/particles/id/:id" },
        { label: "By Name", path: "versions/1.20.5/particles/name/:name" },
      ],
      protocol: [{ label: "All Protocol", path: "versions/1.20.5/protocol" }],
      recipes: [
        { label: "All Recipes", path: "versions/1.20.5/recipes" },
        { label: "By Result ID", path: "versions/1.20.5/recipes/resultId/:resultId" },
        { label: "By Ingredient ID", path: "versions/1.20.5/recipes/ingredientId/:ingredientId" },
      ],
      tints: [
        { label: "All Tints", path: "versions/1.20.5/tints" },
        { label: "Constant Tint", path: "versions/1.20.5/tints/constant" },
        { label: "Foliage Tint", path: "versions/1.20.5/tints/foliage" },
        { label: "Grass Tint", path: "versions/1.20.5/tints/grass" },
        { label: "Redstone Tint", path: "versions/1.20.5/tints/redstone" },
        { label: "Water Tint", path: "versions/1.20.5/tints/water" },
      ],
    },
  };

  function createEndpointElement(route) {
    const endpointDiv = document.createElement("div");
    endpointDiv.className = "endpoint";

    const label = document.createElement("label");
    label.textContent = route.label;
    endpointDiv.appendChild(label);

    const params = Array.isArray(route.param) ? route.param : route.param ? [route.param] : [];
    const inputs = {};

    params.forEach((param) => {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = param;
      input.id = `${param}-${Math.random().toString(36).slice(2)}`;
      input.style.marginRight = "10px";
      endpointDiv.appendChild(input);
      inputs[param] = input;
    });

    const button = document.createElement("button");
    button.textContent = "GET";

    button.addEventListener("click", async () => {
      let fullPath = route.path;

      for (const param of params) {
        const val = inputs[param].value.trim();
        if (!val) {
          alert(`Please insert a value for: "${param}"`);
          return;
        }
        fullPath = fullPath.replace(`:${param}`, encodeURIComponent(val));
      }

      callApi(fullPath);
    });

    endpointDiv.appendChild(button);
    return endpointDiv;
  }

  function callApi(path) {
    output.textContent = `🔄 GET ${BASE}/${path}`;
    fetch(`${BASE}/${path}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        output.textContent = JSON.stringify(data, null, 2);
        output.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch((err) => {
        output.textContent = `❌ Error: ${err.message}`;
      });
  }

  for (const [version, categories] of Object.entries(endpoints)) {
    const versionSection = document.createElement("div");
    versionSection.className = "version-section";

    const versionTitle = document.createElement("h1");
    versionTitle.textContent = `Version: ${version}`;
    versionSection.appendChild(versionTitle);

    for (const [categoryName, routes] of Object.entries(categories)) {
      const section = document.createElement("div");
      section.className = "section";

      // Contenedor para el título + botón toggle
      const titleContainer = document.createElement("div");
      titleContainer.style.display = "flex";
      titleContainer.style.alignItems = "center";
      titleContainer.style.cursor = "pointer";
      titleContainer.style.userSelect = "none";

      const title = document.createElement("h2");
      title.textContent = categoryName;
      title.style.marginRight = "10px";
      titleContainer.appendChild(title);

      const toggleButton = document.createElement("button");
      toggleButton.textContent = "+";
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.style.width = "24px";
      toggleButton.style.height = "24px";
      toggleButton.style.padding = "0";
      toggleButton.style.lineHeight = "1";
      toggleButton.style.fontWeight = "bold";
      titleContainer.appendChild(toggleButton);

      section.appendChild(titleContainer);

      const endpointGrid = document.createElement("div");
      endpointGrid.className = "endpoint-grid";
      endpointGrid.style.display = "none"; // Oculto por defecto

      routes.forEach((route) => {
        const endpointElem = createEndpointElement(route);
        endpointGrid.appendChild(endpointElem);
      });

      section.appendChild(endpointGrid);

      // Función toggle para mostrar u ocultar endpoints
      function toggle() {
        const isHidden = endpointGrid.style.display === "none";
        endpointGrid.style.display = isHidden ? "grid" : "none";
        toggleButton.textContent = isHidden ? "−" : "+";
        toggleButton.setAttribute("aria-expanded", isHidden ? "true" : "false");
      }

      toggleButton.addEventListener("click", (e) => {
        e.stopPropagation(); // evitar que el evento burbujee al contenedor padre
        toggle();
      });

      // Toggle al clickear el título (contiene al botón también)
      titleContainer.addEventListener("click", toggle);

      versionSection.appendChild(section);
    }

    container.appendChild(versionSection);
  }
});
