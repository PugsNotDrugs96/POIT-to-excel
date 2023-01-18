import cheerio from "cheerio";
import axios from "axios"
import {
    fetchKonkurser,
    fetchSkuldsaneringar
  } from "./get-posts.js";

const url = "https://poit.bolagsverket.se/poit-app/"

async function getPosts(){
    try {
        var test = fetchKonkurser();
        const response = await axios.get(url)
        const $ = cheerio.load(response.data);
        const genre = $("h1").text();

        console.log(genre)
    } catch(error){
        console.error(error);
    }
}

getPosts();