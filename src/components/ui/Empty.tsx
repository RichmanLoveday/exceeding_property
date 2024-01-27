import React from "react";

const Empty = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(() => <p>No product could be found</p>);

Empty.displayName = "Empty";

export default Empty;
