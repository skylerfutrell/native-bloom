/**
 * Represents a geographical location with latitude and longitude coordinates.
 * @deprecated Use zip code string instead.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents a native plant.
 */
export interface NativePlant {
  /**
   * The common name of the plant.
   */
  commonName: string;
  /**
   * A description of the plant
   */
  description: string;
  /**
   * The scientific name of the plant.
   */
  scientificName: string;
  /**
   * URL to an image of the plant.
   */
  imageUrl: string;

  /**
   * Growing conditions for the plant (sunlight, soil, water needs).
   */
  growingConditions: string;

  /**
   * Benefits to local ecosystems (pollinators, wildlife).
   */
  ecosystemBenefits: string;

  /**
   * Typical time of year when the plant blooms.
   */
  bloomTime: string;

  /**
   * Basic maintenance tips for the plant.
   */
  maintenance: string;
}

/**
 * Represents an invasive plant species.
 */
export interface InvasivePlant {
  /**
   * The common name of the invasive plant.
   */
  commonName: string;
  /**
   * The scientific name of the invasive plant.
   */
  scientificName: string;
  /**
   * A description of the invasive plant and why it's problematic.
   */
  description: string;
  /**
   * URL to an image of the invasive plant.
   */
  imageUrl: string;
  /**
   * Suggested native alternatives (optional, can be linked later).
   */
  nativeAlternatives?: string[]; // Array of common names of native alternatives
}


/**
 * Asynchronously retrieves a list of native plants for a given zip code.
 * This is currently mock data.
 *
 * @param zipCode The 5-digit US zip code for which to retrieve native plants.
 * @returns A promise that resolves to a list of NativePlant objects.
 */
export async function getNativePlants(zipCode: string): Promise<NativePlant[]> {
  console.log("Fetching native plants for zip code:", zipCode); // Log zip code for debugging

  // Ensure it's a valid zip code string before proceeding (basic check)
  if (!zipCode || typeof zipCode !== 'string' || !/^\d{5}(-\d{4})?$/.test(zipCode)) {
    console.error("Invalid zip code format provided for native plants:", zipCode);
    throw new Error("Invalid zip code format provided for native plants.");
  }

  // Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 800)); // Slightly faster than invasives

  // Return mock data - In a real app, this would call an external API based on zip code
  // The specific plants would vary greatly depending on the actual location input.
  // These examples are generic North American natives.

  // Example: Return different data based on the first digit of the zip code (very simplified regional approximation)
  const firstDigit = zipCode.charAt(0);

  switch (firstDigit) {
    case '0': // Northeast (CT, MA, ME, NH, NJ, NY, PR, RI, VT, VI, AE, AA, AP)
    case '1': // Delaware, New York, Pennsylvania
    case '2': // DC, Maryland, North Carolina, South Carolina, Virginia, West Virginia
       return [
         {
           commonName: 'Blue Flax',
           scientificName: 'Linum lewisii',
           description: 'A perennial wildflower with delicate sky-blue flowers that bloom throughout the summer. Drought-tolerant once established.',
           imageUrl: 'https://picsum.photos/seed/blueflax/400/300',
           growingConditions: 'Full sun. Prefers well-drained sandy or loamy soil. Low water needs once established.',
           ecosystemBenefits: 'Attracts bees and butterflies. Seeds provide food for birds.',
           bloomTime: 'Late Spring to Mid-Summer',
           maintenance: 'Minimal. Cut back spent flower stalks if desired. May self-seed.',
         },
         {
           commonName: 'Serviceberry',
           scientificName: 'Amelanchier canadensis', // Eastern Serviceberry
           description: 'A large shrub or small tree with clusters of white spring flowers followed by edible purplish-red berries.',
           imageUrl: 'https://picsum.photos/seed/serviceberry/400/300',
           growingConditions: 'Full sun to partial shade. Adaptable to various well-drained soils, prefers moist, acidic soil.',
           ecosystemBenefits: 'Early spring nectar source for pollinators (bees). Berries are a valuable food source for birds (e.g., Cedar Waxwings) and mammals.',
           bloomTime: 'Early Spring',
           maintenance: 'Generally low. Prune after flowering if needed to shape or remove dead wood. Water during prolonged drought.',
         },
         {
           commonName: 'Wild Lupine',
           scientificName: 'Lupinus perennis',
           description: 'A beautiful perennial with spikes of purple-blue flowers. Host plant for the Karner blue butterfly caterpillar.',
           imageUrl: 'https://picsum.photos/seed/wildlupine/400/300',
           growingConditions: 'Full sun. Requires dry, sandy, well-drained, low-nutrient soil. Does not tolerate rich soil or transplanting well.',
           ecosystemBenefits: 'Critical host plant for endangered Karner blue butterfly larvae. Flowers attract various pollinators (bees, butterflies).',
           bloomTime: 'Late Spring to Early Summer',
           maintenance: 'Very low. Avoid fertilization. Difficult to establish from nursery stock; best grown from seed.',
         },
          {
            commonName: 'Eastern Redbud',
            scientificName: 'Cercis canadensis',
            description: 'Small deciduous tree famed for its profusion of magenta buds and pink flowers in early spring before the leaves emerge. Heart-shaped leaves.',
            imageUrl: 'https://picsum.photos/seed/redbud/400/300',
            growingConditions: 'Full sun to light shade (best flowering in sun). Prefers moist, well-drained soils but adaptable.',
            ecosystemBenefits: 'Early nectar source for bees (especially bumblebees) and other pollinators. Seeds eaten by some birds.',
            bloomTime: 'Early Spring',
            maintenance: 'Minimal pruning needed, usually just to remove dead or crossing branches. Relatively pest/disease resistant.',
         },
       ];
    case '3': // Southeast (AL, FL, GA, MS, TN, AA, AP)
       return [
         {
           commonName: 'Southern Magnolia',
           scientificName: 'Magnolia grandiflora',
           description: 'Large evergreen tree with huge, fragrant white flowers and glossy dark green leaves. Can be messy (leaf/petal drop).',
           imageUrl: 'https://picsum.photos/seed/magnolia/400/300',
           growingConditions: 'Full sun to partial shade. Prefers rich, moist, well-drained acidic soil. Tolerates clay.',
           ecosystemBenefits: 'Provides dense shelter and nesting sites for birds. Seeds eaten by wildlife (birds, squirrels).',
           bloomTime: 'Late Spring to Summer (sporadically)',
           maintenance: 'Water regularly when young. Pruning usually not required. Rake fallen leaves/petals if desired.',
         },
         {
           commonName: 'Oakleaf Hydrangea',
           scientificName: 'Hydrangea quercifolia',
           description: 'Deciduous shrub with large, oak-shaped leaves, conical clusters of white flowers (aging to pink), and excellent reddish-purple fall color. Peeling bark adds winter interest.',
           imageUrl: 'https://picsum.photos/seed/oakleafhydrangea/400/300',
           growingConditions: 'Partial shade to full shade (morning sun is ideal). Prefers moist, fertile, well-drained soil.',
           ecosystemBenefits: 'Provides cover for wildlife. Flowers attract pollinators (bees).',
           bloomTime: 'Late Spring to Mid-Summer',
           maintenance: 'Blooms on old wood; prune immediately after flowering only if necessary. Water during dry periods. Minimal pests.',
         },
         {
           commonName: 'Gulf Coast Muhly Grass',
           scientificName: 'Muhlenbergia capillaris',
           description: 'A stunning ornamental grass known for its airy plumes of pinkish-purple flowers that create a "cloud" effect in the fall.',
           imageUrl: 'https://picsum.photos/seed/muhlygrass/400/300',
           growingConditions: 'Full sun to light shade. Adaptable to most soils (sand, loam, clay), prefers well-drained. Drought and heat tolerant.',
           ecosystemBenefits: 'Provides nesting material and cover for birds. Seeds eaten by small birds. Attracts beneficial insects.',
           bloomTime: 'Fall (Flowers)',
           maintenance: 'Very low. Cut back foliage in late winter/early spring before new growth emerges.',
         },
       ];
    case '4': // Midwest (IN, KY, MI, OH)
    case '5': // Upper Midwest (IA, MN, MT, ND, SD, WI)
    case '6': // Central Midwest (IL, KS, MO, NE)
      return [
        {
          commonName: 'Purple Coneflower',
          scientificName: 'Echinacea purpurea',
          description: 'Popular perennial with daisy-like purple-pink flowers featuring a prominent, spiny central cone. Blooms through summer.',
          imageUrl: 'https://picsum.photos/seed/coneflower/400/300',
          growingConditions: 'Full sun to light shade. Adaptable to various soils but prefers well-drained loam. Drought tolerant once established.',
          ecosystemBenefits: 'Excellent nectar source for butterflies (Monarchs, Fritillaries) and bees. Seeds feed goldfinches and other birds over winter.',
          bloomTime: 'Early Summer to Fall',
           maintenance: 'Low. Deadhead spent flowers to encourage more blooms, or leave seed heads for birds. Divide clumps every few years if needed.',
        },
        {
          commonName: 'Switchgrass',
          scientificName: 'Panicum virgatum',
          description: 'Tall native grass forming dense clumps with airy flower panicles in late summer. Good fall color and winter structure.',
          imageUrl: 'https://picsum.photos/seed/switchgrass/400/300',
          growingConditions: 'Full sun. Highly adaptable to wet or dry soils, including clay.',
          ecosystemBenefits: 'Provides important cover and nesting habitat for grassland birds and small mammals. Host plant for some skipper butterflies.',
           bloomTime: 'Late Summer (Flowers)',
           maintenance: 'Very low. Cut back foliage in late winter or early spring before new growth.',
        },
        {
          commonName: 'Quaking Aspen',
          scientificName: 'Populus tremuloides',
          description: 'A fast-growing deciduous tree known for its smooth white bark and leaves that tremble in the slightest breeze. Forms beautiful groves via root suckers.',
          imageUrl: 'https://picsum.photos/seed/quakingaspen/400/300',
          growingConditions: 'Full sun to partial shade. Prefers moist, well-drained soil but is adaptable. Needs space.',
          ecosystemBenefits: 'Provides habitat and food (bark, twigs, buds) for numerous wildlife species, including birds, deer, elk, moose, and beaver. Host for various insects.',
          bloomTime: 'Spring (Catkins)',
          maintenance: 'Can be short-lived (50-100 years). Prone to various pests and diseases. Spreads aggressively by suckers, which may require management in small landscapes.',
        },
      ];
    case '7': // South (AR, LA, OK, TX)
      return [
        {
          commonName: 'Texas Sage',
          scientificName: 'Leucophyllum frutescens',
          description: 'An evergreen shrub with silvery-gray foliage and periodic bursts of vibrant purple flowers, often blooming profusely after summer rains.',
          imageUrl: 'https://picsum.photos/seed/texassage/400/300',
          growingConditions: 'Full sun essential. Requires excellent drainage (rocky or sandy soil). Extremely drought and heat tolerant.',
          ecosystemBenefits: 'Flowers attract bees, butterflies, and hummingbirds. Provides cover for small desert wildlife.',
           bloomTime: 'Summer to Fall (Episodic, often after rain)',
           maintenance: 'Very low. Avoid overwatering. Prune lightly only if needed to shape; avoid heavy shearing.',
        },
        {
          commonName: 'Desert Willow',
          scientificName: 'Chilopsis linearis',
          description: 'A small, vase-shaped deciduous tree or large shrub with narrow, willow-like leaves and showy, fragrant, trumpet-shaped flowers in shades of pink and purple.',
          imageUrl: 'https://picsum.photos/seed/desertwillow/400/300',
          growingConditions: 'Full sun. Requires well-drained soil. Very drought tolerant once established.',
          ecosystemBenefits: 'Important nectar source for hummingbirds and bees. Larval host plant for some moths (e.g., White-lined Sphinx).',
           bloomTime: 'Late Spring to Fall',
           maintenance: 'Low. Water deeply but infrequently. Prune in late winter to shape and remove seed pods if desired (though birds may eat seeds).',
        },
        {
          commonName: 'Mealy Blue Sage',
          scientificName: 'Salvia farinacea',
          description: 'A reliable perennial sage with numerous spikes of intense blue flowers rising above gray-green foliage throughout the summer and fall.',
          imageUrl: 'https://picsum.photos/seed/mealybluesage/400/300',
          growingConditions: 'Full sun. Prefers average, well-drained soil. Tolerant of heat and moderate drought.',
          ecosystemBenefits: 'Long blooming period provides sustained nectar for bees, butterflies, and hummingbirds.',
           bloomTime: 'Late Spring to Frost',
           maintenance: 'Low. Deadhead spent flower spikes to promote reblooming. Cut back in late winter.',
        },
      ];
    case '8': // Mountains/Southwest (AZ, CO, ID, NM, NV, UT, WY)
      return [
        {
          commonName: 'Rocky Mountain Penstemon',
          scientificName: 'Penstemon strictus',
          description: 'Showy perennial forming clumps of glossy green leaves with tall spikes of vibrant blue-purple, tubular flowers in early summer. A favorite for hummingbirds.',
          imageUrl: 'https://picsum.photos/seed/penstemon/400/300',
          growingConditions: 'Full sun. Requires well-drained soil, prefers gravelly or sandy conditions. Very drought tolerant once established.',
          ecosystemBenefits: 'Important nectar source for hummingbirds, native bees (especially bumblebees), and butterflies.',
           bloomTime: 'Early to Mid-Summer',
           maintenance: 'Low. Avoid rich soils and overwatering. Cut back flower stalks after blooming if desired. May be short-lived but often self-seeds.',
        },
        {
          commonName: 'Apache Plume',
          scientificName: 'Fallugia paradoxa',
          description: 'A medium-sized shrub with delicate white rose-like flowers followed by attractive, feathery, pinkish seed heads that persist and create a plume effect.',
          imageUrl: 'https://picsum.photos/seed/apacheplume/400/300',
          growingConditions: 'Full sun. Requires excellent drainage (rocky or sandy soil). Very drought tolerant and heat tolerant.',
          ecosystemBenefits: 'Provides nectar for bees. Feathery seeds aid dispersal. Offers cover for desert wildlife.',
           bloomTime: 'Spring to Fall (Flowers intermittently)',
           maintenance: 'Very low. Water infrequently once established. Prune minimally if needed for shaping.',
        },
        {
          commonName: 'Blue Grama Grass',
          scientificName: 'Bouteloua gracilis',
          description: 'A warm-season ornamental grass highly valued for its unique, horizontal seed heads resembling tiny combs or eyelashes, held on arching stems. Fine, gray-green foliage.',
          imageUrl: 'https://picsum.photos/seed/bluegrama/400/300',
          growingConditions: 'Full sun. Prefers well-drained soil (sandy, loamy, clay). Extremely drought tolerant and adaptable.',
          ecosystemBenefits: 'Provides forage for wildlife. Larval host plant for several skipper butterflies. Seeds eaten by birds.',
           bloomTime: 'Summer (Seed heads)',
           maintenance: 'Very low. Leave foliage and seed heads for winter interest. Cut back in early spring before new growth.',
        },
      ];
    case '9': // West Coast/Pacific (AK, AS, CA, FM, GU, HI, MH, MP, OR, PW, WA, AE, AA, AP)
       return [
         {
           commonName: 'California Poppy',
           scientificName: 'Eschscholzia californica',
           description: 'The iconic state flower of California, an annual or short-lived perennial known for its vibrant orange, cup-shaped flowers that close at night and on cloudy days. Reseeds readily.',
           imageUrl: 'https://picsum.photos/seed/capoppy/400/300',
           growingConditions: 'Full sun. Requires excellent drainage; prefers sandy, poor soil. Very drought tolerant. Best in cool seasons.',
           ecosystemBenefits: 'Attracts native bees and other pollinators seeking pollen (offers little nectar).',
           bloomTime: 'Spring to Early Summer (longer in cool coastal areas)',
           maintenance: 'Minimal. Water sparingly. Allow seeds to mature and scatter for reseeding. Deadheading can prolong bloom but prevents reseeding.',
         },
         {
           commonName: 'Coast Live Oak',
           scientificName: 'Quercus agrifolia',
           description: 'A majestic evergreen oak tree native to the California coast ranges. Forms a broad, dense, rounded canopy with dark green, holly-like leaves.',
           imageUrl: 'https://picsum.photos/seed/coastliveoak/400/300',
           growingConditions: 'Full sun to partial shade. Prefers well-drained soil but adaptable. Very drought tolerant once established (after ~3-5 years).',
           ecosystemBenefits: 'Keystone species providing critical habitat and acorns (food) for a vast array of wildlife (birds, mammals, insects). Supports hundreds of caterpillar species, feeding birds.',
           bloomTime: 'Spring (Inconspicuous flowers)',
           maintenance: 'Water deeply but infrequently when young. Mature trees need no supplemental water. Prune only if necessary for structure or safety, preferably by a certified arborist. Avoid summer watering near the trunk.',
         },
         {
           commonName: 'Toyon',
           scientificName: 'Heteromeles arbutifolia',
           description: 'An evergreen shrub or small tree, also known as California Holly or Christmas Berry, with glossy green, serrated leaves, clusters of small white summer flowers, and large clusters of bright red berries in winter.',
           imageUrl: 'https://picsum.photos/seed/toyon/400/300',
           growingConditions: 'Full sun to partial shade. Adaptable to various soils (clay, loam, sand) but needs decent drainage. Drought tolerant once established.',
           ecosystemBenefits: 'Flowers attract numerous pollinators (bees, flies, butterflies). Winter berries are a vital food source for birds like Cedar Waxwings, Robins, and Mockingbirds.',
           bloomTime: 'Summer',
           maintenance: 'Low. Water occasionally during the first few years. Prune after berry season if needed for shaping or size control.',
         },
         {
           commonName: 'California Buckwheat',
           scientificName: 'Eriogonum fasciculatum var. foliolosum',
           description: 'A hardy, rounded evergreen shrub with small, needle-like green leaves and abundant flattish clusters of tiny white to pinkish flowers that bloom over a long period. Flowers dry to a rusty brown, providing winter interest.',
           imageUrl: 'https://picsum.photos/seed/cabuckwheat/400/300',
           growingConditions: 'Full sun essential. Requires well-drained soil, thrives in poor, dry, rocky or sandy soils. Very drought tolerant.',
           ecosystemBenefits: 'Extremely important "pollinator magnet," providing abundant nectar for bees, butterflies, flies, and other beneficial insects. Seeds feed birds (e.g., quail, sparrows). Larval host for several butterfly species.',
           bloomTime: 'Spring to Fall (Long blooming period)',
           maintenance: 'Very low. Needs no supplemental water once established. Cut back spent flower heads in late fall/winter if desired, or leave for birds and winter interest.',
         },
       ];
    default:
      // Return an empty array or a default set if zip code doesn't match expected pattern
      console.warn("Zip code does not match expected regional patterns for native plants:", zipCode);
      return [];
  }
}


/**
 * Asynchronously retrieves a list of common invasive plants for a given zip code.
 * This is currently mock data.
 *
 * @param zipCode The 5-digit US zip code for which to retrieve invasive plants.
 * @returns A promise that resolves to a list of InvasivePlant objects.
 */
export async function getInvasivePlants(zipCode: string): Promise<InvasivePlant[]> {
  console.log("Fetching invasive plants for zip code:", zipCode);

  if (!zipCode || typeof zipCode !== 'string' || !/^\d{5}(-\d{4})?$/.test(zipCode)) {
    console.error("Invalid zip code format provided for invasive plants:", zipCode);
    throw new Error("Invalid zip code format provided for invasive plants.");
  }

  // Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 1200)); // Slightly longer delay

  const firstDigit = zipCode.charAt(0);

  // Mock data based on simplified regions
  switch (firstDigit) {
    case '0': // Northeast
    case '1':
    case '2':
      return [
        {
          commonName: 'Japanese Knotweed',
          scientificName: 'Reynoutria japonica',
          description: 'Aggressive perennial forming dense thickets, displacing native vegetation. Spreads rapidly via rhizomes and can damage infrastructure.',
          imageUrl: 'https://picsum.photos/seed/knotweed/400/300',
          nativeAlternatives: ['Serviceberry', 'Eastern Redbud'] // Example alternatives from the native list
        },
        {
          commonName: 'Garlic Mustard',
          scientificName: 'Alliaria petiolata',
          description: 'Biennial herb that invades forest understories, outcompeting native wildflowers and altering soil chemistry.',
          imageUrl: 'https://picsum.photos/seed/garlicmustard/400/300',
          nativeAlternatives: ['Wild Ginger', 'Foamflower'] // Need actual native data for these
        },
      ];
    case '3': // Southeast
      return [
        {
          commonName: 'Kudzu',
          scientificName: 'Pueraria montana var. lobata',
          description: 'Rapidly growing vine that smothers trees and other vegetation, creating dense monocultures.',
          imageUrl: 'https://picsum.photos/seed/kudzu/400/300',
          nativeAlternatives: ['Trumpet Vine', 'Crossvine'] // Need actual native data
        },
        {
          commonName: 'Chinese Privet',
          scientificName: 'Ligustrum sinense',
          description: 'Evergreen shrub forming dense thickets in forests and along waterways, displacing native understory plants.',
          imageUrl: 'https://picsum.photos/seed/privet/400/300',
          nativeAlternatives: ['Oakleaf Hydrangea', 'Wax Myrtle'] // Need actual native data
        },
      ];
    case '4': // Midwest
    case '5':
    case '6':
      return [
        {
          commonName: 'Common Buckthorn',
          scientificName: 'Rhamnus cathartica',
          description: 'Tall shrub or small tree invading woodlands and prairies. Alters soil nitrogen levels and hosts pests.',
          imageUrl: 'https://picsum.photos/seed/buckthorn/400/300',
          nativeAlternatives: ['Serviceberry', 'Nannyberry'] // Need actual native data
        },
        {
          commonName: 'Bush Honeysuckle',
          scientificName: 'Lonicera spp. (non-native)',
          description: 'Several invasive honeysuckle species form dense thickets, shading out native plants and reducing forest regeneration.',
          imageUrl: 'https://picsum.photos/seed/honeysuckle/400/300',
          nativeAlternatives: ['American Elderberry', 'Ninebark'] // Need actual native data
        },
      ];
    case '7': // South Central
      return [
        {
          commonName: 'Giant Reed',
          scientificName: 'Arundo donax',
          description: 'Very tall grass that invades riparian areas, consumes large amounts of water, and increases fire risk.',
          imageUrl: 'https://picsum.photos/seed/giantreed/400/300',
          nativeAlternatives: ['Switchgrass', 'Big Bluestem'] // Need actual native data
        },
        {
          commonName: 'Salt Cedar (Tamarisk)',
          scientificName: 'Tamarix spp.',
          description: 'Shrubs or trees invading riverbanks and arid lands, increasing soil salinity and outcompeting native vegetation.',
          imageUrl: 'https://picsum.photos/seed/saltcedar/400/300',
          nativeAlternatives: ['Desert Willow', 'Screwbean Mesquite'] // Need actual native data
        },
      ];
    case '8': // Mountains/Southwest
      return [
        {
          commonName: 'Russian Knapweed',
          scientificName: 'Acroptilon repens',
          description: 'Perennial forb invading rangelands and fields, toxic to horses, and difficult to control due to extensive root system.',
          imageUrl: 'https://picsum.photos/seed/knapweed/400/300',
          nativeAlternatives: ['Rocky Mountain Penstemon', 'Showy Milkweed'] // Need actual native data
        },
        {
          commonName: 'Cheatgrass',
          scientificName: 'Bromus tectorum',
          description: 'Annual grass that dominates arid lands, increasing fire frequency and outcompeting native bunchgrasses.',
          imageUrl: 'https://picsum.photos/seed/cheatgrass/400/300',
          nativeAlternatives: ['Blue Grama Grass', 'Indian Ricegrass'] // Need actual native data
        },
      ];
    case '9': // West Coast/Pacific
      return [
        {
          commonName: 'English Ivy',
          scientificName: 'Hedera helix',
          description: 'Evergreen vine that climbs trees, eventually weakening or killing them, and forms dense groundcover excluding natives.',
          imageUrl: 'https://picsum.photos/seed/englishivy/400/300',
          nativeAlternatives: ['Western Wild Ginger', 'Evergreen Huckleberry'] // Need actual native data
        },
        {
          commonName: 'Pampas Grass',
          scientificName: 'Cortaderia selloana',
          description: 'Large ornamental grass that escapes cultivation and invades coastal areas and disturbed sites, posing a fire hazard.',
          imageUrl: 'https://picsum.photos/seed/pampas/400/300',
          nativeAlternatives: ['California Fescue', 'Deer Grass'] // Need actual native data
        },
      ];
    default:
      console.warn("Zip code does not match expected regional patterns for invasive plants:", zipCode);
      return [];
  }
}
