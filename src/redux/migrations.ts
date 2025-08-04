import { MigrationManifest } from "redux-persist";

const migrations: MigrationManifest = {
  1: (state: any) => {
    return {
      ...state,
    };
  },
};

export { migrations };
