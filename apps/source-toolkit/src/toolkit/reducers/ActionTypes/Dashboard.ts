import {
  GET_ACADEMY_DATA,
  GET_ANALYTICS_DATA,
  GET_CRM_DATA,
  GET_CRYPTO_DATA,
  GET_ECOMMERCE_DATA,
  GET_HEALTH_CARE_DATA,
  GET_METRICS_DATA,
  GET_WIDGETS_DATA,
} from '@crema/actions/Dashboard.action';

import { AcademyType } from '@crema/models/dashboards/Academy';
import { AnalyticsType } from '@crema/models/dashboards/Analytics';
import { CRMType } from '@crema/models/dashboards/CRM';
import { CryptoPropsType } from '@crema/models/dashboards/Crypto';
import { EcommerceType } from '@crema/models/dashboards/Ecommerce';
import { HealthCareType } from '@crema/models/dashboards/HealthCare';
import { MetricsType } from '@crema/models/dashboards/Metrics';
import { WidgetsType } from '@crema/models/dashboards/Widgets';
import { createAction } from '@reduxjs/toolkit';

export const GetAnalyticsAction =
  createAction<AnalyticsType>(GET_ANALYTICS_DATA);

export const GetAcademyAction = createAction<AcademyType>(GET_ACADEMY_DATA);

export const GetEcomAction = createAction<EcommerceType>(GET_ECOMMERCE_DATA);

export const GetCrmAction = createAction<CRMType>(GET_CRM_DATA);

export const GetCryptoAction = createAction<CryptoPropsType>(GET_CRYPTO_DATA);

export const GetHealthcareAction =
  createAction<HealthCareType>(GET_HEALTH_CARE_DATA);

export const GetMetricsAction = createAction<MetricsType>(GET_METRICS_DATA);

export const GetWidgetsAction = createAction<WidgetsType>(GET_WIDGETS_DATA);
