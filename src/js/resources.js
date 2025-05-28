import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { FishingRod } from './fishingRod'

let Resources = {
    FishingRod: new ImageSource('images/fishingRod.png'),
    Fish: new ImageSource('images/fish.png'),
    Bubble: new ImageSource('images/bubble.png'),
    BoneFish: new ImageSource('images/bones.png'),
}



const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }