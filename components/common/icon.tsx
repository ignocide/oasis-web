const Icon = ({className = '', name, ...props}) => {
  return <i className={["icon", `ion-md-${name}`, className].join(" ")} {...props}></i>;
};

export default Icon;