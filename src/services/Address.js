// export default "http://83.212.82.248:8080";
// export default "http://LOCALHOST:8080";

const ADDRESS = new URL(window.location).hostname;

export default "http://"+ADDRESS+":8080";



