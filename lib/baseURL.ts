export default function getBaseUrl(){
    if(process.env.NODE_ENV == 'development')
        return 'http://localhost:3000'
    
    return 'https://dshinfrared.vercel.app'
}