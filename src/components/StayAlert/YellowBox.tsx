interface ContentInterface {
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  contentContainerRef: React.RefObject<HTMLDivElement>;
}

export const YellowBox = (props: ContentInterface): JSX.Element => {
  return (
    <div className="yellow-poster-container" ref={props.contentContainerRef}>
      <div className="yellow-poster">
        <figure className="yellow-poster-inner is-grouped-centered is-vcentered">
          <p className="has-text-centered">{props.lineOne}</p>
          <div className="arrow-down" />
          <p className="has-text-centered">{props.lineTwo}</p>
          <div className="arrow-down" />
          <p className="has-text-centered">{props.lineThree}</p>
        </figure>
      </div>
    </div>
  );
};
