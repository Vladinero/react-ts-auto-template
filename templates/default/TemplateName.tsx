// @ts-ignore
import classes from './TemplateName.module.scss';

export interface TemplateNameProps {}

const TemplateName = ({ }: TemplateNameProps) => (
  <div className={classes["TemplateName"]} data-testid="TemplateName">
    TemplateName Component
  </div>
);

export default TemplateName;