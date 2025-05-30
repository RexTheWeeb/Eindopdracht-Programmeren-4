import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { FishingRod } from './fishingRod'
import { BikeWheel } from './bikeWheel'

let Resources = {
    FishingRod: new ImageSource('images/fishingRod.png'),
    Fish: new ImageSource('images/fishSprite.png'),
    FishShadow: new ImageSource('images/fishShadow.png'),
    ClownFish: new ImageSource('images/clownFishSprite.png'),
    LionFish : new ImageSource('images/lionFish.png'),
    ClownFishShadow : new ImageSource('images/clownFishShadow.png'),
    LionFishShadow : new ImageSource('images/lionFishShadow.png'),
    BikeWheel: new ImageSource('images/bikeWheel.png'),
    BikeWheelShadow: new ImageSource('images/bikeWheelShadow.png'),
}



const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }