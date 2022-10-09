import classes from './TemplateName.module.scss';

export interface TemplateNameProps {}

export const TemplateName = ({}: TemplateNameProps) => (
  <div className={classes['templateName']} data-testid="templateName">
    TemplateName Component
  </div>
);
