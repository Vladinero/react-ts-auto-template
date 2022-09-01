// @ts-ignore
import classes from './templateName.module.scss';

export interface TemplateNameProps {}

export const TemplateName = ({ }: TemplateNameProps) => (
  <div className={classes["templateName"]} data-testid="TemplateName">
    TemplateName Component
  </div>
);