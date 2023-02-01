import {
    fetchKonkurser,
    fetchSkuldsaneringar,
    fetchPostByID,
  } from "./poit-api.js";

const konkurs_data = [];
const konkurs_posts = [];
const skuldsaneringar_data = [];
const skuldsaneringar_posts = [];

export async function getKonkurserPosts(){
    try {
        const konkurser = await fetchKonkurser();
        await konkurser.forEach(element => {
            if(konkurs_data.includes(element.kungorelseid)){
                return;
            } else {
                konkurs_data.push(element.kungorelseid);
            }
        });
        return getIndividualPosts(konkurs_data);
    } catch(error){
        console.error(error);
    }
}

export async function getSkuldsaneringarPosts(){
    try {
        const skuldsaneringar = await fetchSkuldsaneringar();
        await skuldsaneringar.forEach(async element => {
            if(skuldsaneringar_data.includes(element.kungorelseid)){
                return;
            } else {
                skuldsaneringar_data.push(element.kungorelseid);
            }
        });
        return getIndividualPosts(skuldsaneringar_data);
    } catch(error){
        console.error(error);
    }

}

async function getIndividualPosts(data){
    const posts = [];
    for (const element of data) {
        await new Promise(r => setTimeout(r, Math.floor(Math.random() * 1000)));
        const post = await fetchPostByID(element);
        var count = Object.keys(post.fysiskaJuridiskaPersoner).length;
        for(var i = 0; i < count; i++){
            var postObject = {
                rubrik: post.rubrik,
                namn: post.fysiskaJuridiskaPersoner[i].namn,
                personnummer: post.fysiskaJuridiskaPersoner[i].nummer,
                registreringsDatum: post.registreringsDatum,
                publiceringsDatum: post.publiceringsDatum,
                id: post.kungorelseid,
            };
            posts.push(postObject);
        }
    };
    return posts;
}