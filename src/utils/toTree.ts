export const toTree = <T extends { parent?: string; id: string }>(arr: T[]) => {
  type WithChildren = T & { children: WithChildren[] };
  // arr: [{id:null, name:null, parent:null}]
  const map = {};
  for (let i = 0; i < arr.length; i++) {
    const obj = { ...arr[i], children: [] };
    map[obj.id] = obj;

    const parent = obj.parent || "-";
    if (!map[parent]) {
      map[parent] = {
        children: [],
      };
    }
    map[parent].children.push(obj);
  }

  return (map["-"]?.children as WithChildren[]) || [];
};
