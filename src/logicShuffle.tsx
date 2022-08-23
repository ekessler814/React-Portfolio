import _ from "lodash";

const interleave: any = ([x, ...xs]: any, ys: any = []) =>
  x === undefined
    ? ys // base: no x
    : [x, ...interleave(ys, xs)];

const distributeGender = (shuffled: any) => {
  const mutated = shuffled.reduce((acc: any, iter: any) => {
    const randomGend = _.shuffle(["male", "female"])[0];
    acc.push({
      ...iter,
      gender: iter.selection === "?" ? randomGend : iter.selection,
    });
    return acc;
  }, []);
  const male = mutated.filter((a: any) => a.gender === "male");
  const female = mutated.filter((a: any) => a.gender === "female");
  return interleave(male, female);
};

const sortIntoSetGroups = (concat: any, numPeoplePer: any) => {
  let group: any[] = [];
  return concat.reduce((acc: any, iter: any, idx: number) => {
    if (group.length >= numPeoplePer) {
      acc.push(group);
      group = [];
    }
    group.push(iter);
    if (idx === concat.length - 1) {
      acc.push(group);
    }
    return acc;
  }, []);
};

const shuffleTeams = ({ names, numPeoplePer, genderCheck, numGroups }: any) => {
  const shuffled = _.shuffle(names);
  const concat = genderCheck ? distributeGender(shuffled) : shuffled;
  return sortIntoSetGroups(
    concat,
    numPeoplePer ? numPeoplePer : concat.length / numGroups
  );
};

export { shuffleTeams };
