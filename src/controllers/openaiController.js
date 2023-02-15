const {Configuration, OpenAiApi, OpenAIApi} = require("openai")

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY})
const openai = new OpenAIApi(configuration)


const generateVariation = async (req, res) => {
    
    const {img, number, size} = req.body

    // TODO Need to create a way to send and img to the api. I think
    
    try {
        const response = await openai.createImageVariation({
            image : img,
            n : 1,
            size: '256x256'
        })

        console.log(data)
        const imageUrl = response.data.data.map((_obj) => {
            return _obj.url
        })

        res.status(200).json({
            success: true,
            data: imageUrl,
        })

    }catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        
        res.status(400).json({
            success: false,
            data: 'Variations could not be created',
        })
    }
},
generateImage = async (req, res) => {
    
    const {prompt, size, number} = req.body

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'
    
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: parseInt(number,10),
            size: imageSize
        })

        console.log(response.data)
        // const imageUrl = response.data.data[0].url
        const imageUrl = response.data.data.map((_obj) => {
            return _obj.url
        })

        res.status(200).json({
            success: true,
            data: imageUrl,
        })

    }catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        
        res.status(400).json({
            success: false,
            data: 'The image cannot be generated',
        })
    }
}

module.exports = {generateImage, generateVariation}
