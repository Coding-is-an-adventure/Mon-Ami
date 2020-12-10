import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface LoadingProps {
  inverted?: boolean;
  content?: string;
}

const Loading: React.FC<LoadingProps> = ({ inverted, content }) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};

export default Loading;
