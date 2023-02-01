import axios from "axios";

export async function fetchKonkurser() {
    var date = getDate();
    const response = await axios
      .get(`https://poit.bolagsverket.se/poit/rest/SokKungorelse?tidsperiodFrom=${date}&tidsperiodTom=${date}&amnesomradeId=3`)
      .catch((err) => {
        console.error(err.message + 1);
      });
    return response.data;
  }

  export async function fetchSkuldsaneringar() {
    var date = getDate();

    const response = await axios
      .get(`https://poit.bolagsverket.se/poit/rest/SokKungorelse?tidsperiodFrom=${date}&tidsperiodTom=${date}&amnesomradeId=5`)
      .catch((err) => {
        console.error(err.message);
      });
    return response.data;
  }

  export async function fetchPostByID(id) {
    return new Promise(async (resolve) => {
      const response = await axios
      .get(`https://poit.bolagsverket.se/poit/rest/HamtaKungorelse?kungorelseid=${id}`)
      .then((response) => {resolve(response.data)})
      .catch((err) => {
        console.error(err.message);
      });
    });
  }

  export default function getDate(){
    var yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    return yourDate.toISOString().split('T')[0]
  }