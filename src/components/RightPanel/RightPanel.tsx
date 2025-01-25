import React from "react";
import { observer } from "mobx-react-lite";
import { PropertyEditor } from "../PropertyEditor/PropertyEditor";
import { LayersList } from "../LayersList/LayersList";
import { CollaborationPanel } from "../Collaboration/CollaborationPanel";

export const RightPanel: React.FC = observer(() => {
  return (
    <div className="right-panel">
      <PropertyEditor />
      <LayersList />
      <CollaborationPanel />
    </div>
  );
});
