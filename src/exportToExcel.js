import xlsx from "xlsx";
import path from "path";

function exportExcel(data, workSheetColumnNames, workSheetName, filePath) {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    workSheet['!cols'] = [{wch: 25}, {wch: 25}, {wch: 17}, {wch: 18}, {wch: 18}, {wch: 12}];
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

export default function exportUserToExcel(users, workSheetColumnNames, workSheetName, filePath) {
    const data = users.map(user => {
        return [user.rubrik, user.namn, user.personnummer, user.registreringsDatum, user.publiceringsDatum, user.id];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}