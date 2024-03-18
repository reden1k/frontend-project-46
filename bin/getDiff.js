import _ from "lodash";

export default (file1, file2) => {
   const keys1 = Object.keys(file1);
   const keys2 = Object.keys(file2);

   const lines = _.sortBy(_.union(keys1, keys2)).map((key) => {

        let line;

        if (_.includes(keys1, key) && _.includes(keys2, key)) { 
            if (_.isEqual(file1[key], file2[key])) {
                line = `  ${key}: ${file1[key]}`
            } else {
                line = `- ${key}: ${file1[key]} \n  + ${key}: ${file2[key]}`;
            }
        }

        if (_.includes(keys1, key) && !_.includes(keys2, key)) {
            line = `- ${key}: ${file1[key]}`
        }
         if (!_.includes(keys1, key) && _.includes(keys2, key)) {
            line = `+ ${key}: ${file2[key]}`
        }
        return line;
   });
   
   return ([ '{', ...lines, ].join('\n  ') + '\n}')
}