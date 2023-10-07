class Server {
    readonly host: string = import.meta.env.VITE_SERVER_HOST
  
  
    endpoint(path: string) {
      if (this.host.slice(-1) !== "/") {
        return this.host + path
      }
      return `${this.host}/${path}`
    }
  }
  
export const ServerConfig = new Server()
  