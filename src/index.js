import getDate from "./poit-api.js";
import { getKonkurserPosts, getSkuldsaneringarPosts} from "./poit.js";    
import exportUserToExcel from "./exportToExcel.js";

const workSheetColumnNames = ["Rubrik", "Namn", "Personnummer", "Registreringsdatum", "Publiceringsdatum", "ID"];
var konkurs_posts;
var skuldsaneringar_posts;

async function getPOITData(){
    konkurs_posts = await getKonkurserPosts();
    skuldsaneringar_posts = await getSkuldsaneringarPosts();
    createPOITFile();
    //skuldsaneringar_posts = getSkuldsaneringarPosts();
};

function createPOITFile(){
    exportUserToExcel(konkurs_posts, workSheetColumnNames, "Konkurs", `../outputFiles/konkurser-${getDate()}.xlsx`);
    exportUserToExcel(skuldsaneringar_posts, workSheetColumnNames, "Skuldsanering", `../outputFiles/skuldsaneringar-${getDate()}.xlsx`);
}

getPOITData();