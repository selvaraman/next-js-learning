
export type Trait = "attack" | "health" | "speed";

export type Attribute = {
    trait_type: Trait;
    value: string
}

export type NftMeta = {
    name: string;
    description: string;
    image: string;
    attributes: Attribute[]
}