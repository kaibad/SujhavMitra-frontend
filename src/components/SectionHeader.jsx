import "../index.css";

const SectionHeader = ({ subtitle, title, description }) => {
  return (
    <div className="section-header text-center">
      {subtitle && <h4 className="section-subtitle">{subtitle}</h4>}
      {title && <h2 className="section-title">{title}</h2>}
      {description && <p className="section-description">{description}</p>}
    </div>
  );
};

export default SectionHeader;
