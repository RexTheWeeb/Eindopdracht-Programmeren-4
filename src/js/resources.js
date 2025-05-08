import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Doro: new ImageSource('images/Doro.png'),
    Crewmate: new ImageSource('images/Crewmate.png'),
    Nishiki: new ImageSource('images/nishiki.jpg'),
}



const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }