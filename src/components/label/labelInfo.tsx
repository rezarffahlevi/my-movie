import React, { FC } from "react";

type Props = {
  label: string | undefined;
  value: string | number | undefined;
};

export const LabelInfo: FC<Props> = React.memo((props) => {
  return (
    <div>
      <p className="font-bold">{props.label}</p>
      <p className="">{props.value}</p>
    </div>
  );
});
