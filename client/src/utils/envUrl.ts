
export const envUrl = () => {
    const currentEnv = process.env.REACT_APP_ENV
    switch (currentEnv) {
        case "dev":
            return process.env.REACT_APP_DEV_URL    
        case "prod":
            return process.env.REACT_APP_PROD_URL    
        default :
            return process.env.REACT_APP_SERVER_URL ?? process.env.REACT_APP_DEV_URL
    }
}