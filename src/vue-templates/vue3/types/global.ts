const template = `
import type { TableColumnCtx } from 'element-plus';
export {};
declare global {
  declare type Recordable<T = any> = Record<string, T>;
  declare module '*.png';

  type TableColumnList<T = any> = Array<Partial<TableColumnCtx<T>>>;

  interface PlatformConfigs {
    consultation: {
      detailAddress: string;
      address: string;
    },
    downloadTemplate: {
      commitmentFileTemplateName: string;
      complianceAssessmentFileTemplateName: string;
    },
    sso: {
      admin_loginUrl: string;
      user_loginUrl: string;
    }
  }
  interface ImportMetaEnv extends Readonly<Record<string, string>> {
    VITE_SSO_ADMIN_LOGINURL: string;
    VITE_SSO_USER_LOGINURL: string;
    VITE_BASE_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
}
`;

export default {
  name: 'global.d.ts',
  path: 'types',
  template,
};