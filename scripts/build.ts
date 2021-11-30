import * as fs from "fs";
import * as path from "path";
import template from "./template.json";
import { Metadata } from "./types";
import csv from "csv-parser";

const OUTPUT_PATH_BASE = "./public/metadata/";

const csvPath = path.join(__dirname, "./parameter.csv");
const list: any[] = [];

const padding =(num: number)=>{
  return ( '000' + num ).slice( -3 );
}

fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", (data) => list.push(data))
  .on("end", () => {
    for (let i = 1; i <= list.length; i++) {
      const metadata: Metadata = {
        ...template,
        id: padding(i),
        name: `${template.name} #${padding(i)}`,
        image: `${template.image}${padding(i)}.png`,
        attributes:{
          species: list[i-1].sepecies,
          sex: list[i-1].sex,
          heritage: list[i-1].heritage,
          personality: list[i-1].personality,
          weapon: list[i-1].weapon,
          HP: Number(list[i-1].HP),
          STR: Number(list[i-1].STR),
          INT: Number(list[i-1].INT),
          SPD: Number(list[i-1].SPD),
          LUK: Number(list[i-1].LUK),
        }
      };
      fs.writeFileSync(`${OUTPUT_PATH_BASE}${i}`, JSON.stringify(metadata));
      metadatas.push(metadata);
    }
  })

const metadatas: Metadata[] = [];




fs.writeFileSync(`${OUTPUT_PATH_BASE}assets.json`, JSON.stringify(metadatas));
