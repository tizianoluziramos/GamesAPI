export interface Mechanics {
    name:                string;
    description:         string;
    types?:              string[];
    properties?:         Properties;
    restrictions?:       string[];
    modes?:              string[];
    features?:           Features;
    interactions?:       Interactions;
    activationMethods?:  string[];
    outputs?:            string[];
    linkedMechanics?:    string[];
    lifespan?:           string;
    requires?:           string;
    activation?:         string[];
    behavior?:           Behavior;
    voiceLines?:         boolean;
    uses?:               string[];
    formula?:            string;
    usedFor?:            string[];
    dependencies?:       string[];
    triggerTypes?:       string[];
    includesHumor?:      boolean;
    addsNarrativeDepth?: boolean;
}

export interface Behavior {
    detectPlayer:              boolean;
    shootUntilLineOfSightLost: boolean;
    canBeDisabled:             string[];
}

export interface Features {
    portalColors:     string[];
    chargeRequired:   boolean;
    canPickUpObjects: boolean;
}

export interface Interactions {
    canBeCarried?:                   boolean;
    canActivateButtons?:             boolean;
    canBlockEnergyPellets?:          boolean;
    canBeDetachedUsingPortals?:      boolean;
    nonFunctional?:                  boolean;
    emitsSignalWhenInSpecificZones?: boolean;
    "No direct interaction"?:        boolean;
    "Adds world-building"?:          boolean;
}

export interface Properties {
    canShootThrough?:                boolean;
    preservesMomentum?:              boolean;
    preservesOrientation?:           boolean;
    canBeTimed?:                     boolean;
    canBeLocked?:                    boolean;
    requiresInputSignal?:            boolean;
    lethalToPlayer?:                 boolean;
    bouncesOffWalls?:                boolean;
    usedToActivate?:                 string[];
    hasCountdownTimer?:              boolean;
    canBeLinkedToMultipleMechanics?: boolean;
    canBeStationary?:                boolean;
    canBeSynchronized?:              boolean;
    destroysPortals?:                boolean;
    removesCubes?:                   boolean;
    blocksEnergyPellets?:            boolean;
    preventsPortalShooting?:         boolean;
}
