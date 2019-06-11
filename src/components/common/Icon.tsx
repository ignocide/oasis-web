const Icon = ({className = '', name, ...props}) => {
  return <i className={["material-icons",className].join(" ")} {...props}>{name}</i>;
};

export default Icon;