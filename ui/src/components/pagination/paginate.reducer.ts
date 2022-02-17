import {
  CursorPaging,
  PageInfo,
} from 'queries';

export const reducer = <T extends { [any: string]: any }>(
  state: T,
  pageInfo: PageInfo,
  payload: { type: keyof T | "clear"; key: string; value: any },
  initialValue: any
) => {
  const key = payload.key;
  const value = payload.value;
  if (!value && value === "") {
    return { ...state };
  }
  switch (payload.type) {
    case "paging": {
      const key = payload.key;
      let paging: CursorPaging = { first: state.paging.first };
      if (key === "before" || key === "after") {
        const cursor =
          key === "before" ? pageInfo?.startCursor : pageInfo?.endCursor;
        paging = {
          [key]: cursor,
          ...paging,
        };
      }
      return { ...state, paging };
    }
    case "filter": {
      const filter = { ...state.filter, [key]: { like: `%${value}%` } };
      return { ...state, filter };
    }
    case "gte": {
      const filter = { [key]: { gte: parseInt(value) } };
      const and = [...(state?.filter?.and || []), ...[filter]];
      return { ...state, ...{ filter: { and } } };
    }
    case "lte": {
      const filter = { [key]: { lte: parseInt(value) } };
      const and = [...(state?.filter?.and || []), ...[filter]];
      return { ...state, ...{ filter: { and } } };
    }
    case "eq": {
      if (value.constructor.name === "String") {
        const filter = { ...state.filter, [key]: { eq: value } };
        return { ...state, filter };
      } else {
        const k = [key, ...Object.keys(value)];
        const obj = {};
        let curr = obj;
        k.forEach((v) => {
          curr[v] = {};
          curr = curr[v];
        });
        const v = Object.values(value);
        curr["eq"] = v[v.length - 1];
        return { ...state, filter: { ...obj } };
      }
    }
    case "sorting": {
      if (!value) {
        return state;
      }
      const index = state?.sorting?.findIndex((v) => v.field === key);
      if (index && index > -1) {
        state.sorting.splice(index, 1);
      }
      (state as any).sorting = [
        ...(state.sorting || []),
        ...[
          {
            field: key,
            direction: value,
          },
        ],
      ];
      return { ...state };
    }
    case "clear": {
      return { ...initialValue };
    }
    default: {
      return state;
    }
  }
};
