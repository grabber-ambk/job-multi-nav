import { createReducer } from '@reduxjs/toolkit';
import { AcademyType } from '@crema/models/dashboards/Academy';
import { AnalyticsType } from '@crema/models/dashboards/Analytics';
import { CRMType } from '@crema/models/dashboards/CRM';
import { CryptoPropsType } from '@crema/models/dashboards/Crypto';
import { EcommerceType } from '@crema/models/dashboards/Ecommerce';
import { HealthCareType } from '@crema/models/dashboards/HealthCare';
import { MetricsType } from '@crema/models/dashboards/Metrics';
import { WidgetsType } from '@crema/models/dashboards/Widgets';
import {
  GetAcademyAction,
  GetAnalyticsAction,
  GetCrmAction,
  GetCryptoAction,
  GetEcomAction,
  GetHealthcareAction,
  GetMetricsAction,
  GetWidgetsAction,
} from './ActionTypes/Dashboard';

const initialState: {
  academyData: AcademyType | null;
  ecommerceData: EcommerceType | null;
  healthCare: HealthCareType | null;
  analyticsData: AnalyticsType | null;
  crmData: CRMType | null;
  cryptoData: CryptoPropsType | null;
  metricsData: MetricsType | null;
  widgetsData: WidgetsType | null;
} = {
  analyticsData: null,
  ecommerceData: null,
  crmData: null,
  cryptoData: null,
  metricsData: null,
  widgetsData: null,
  healthCare: null,
  academyData: null,
};

const dashboardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GetAnalyticsAction, (state, action) => {
      state.analyticsData = action.payload;
    })
    .addCase(GetEcomAction, (state, action) => {
      state.ecommerceData = action.payload;
    })
    .addCase(GetAcademyAction, (state, action) => {
      state.academyData = action.payload;
    })
    .addCase(GetCrmAction, (state, action) => {
      state.crmData = action.payload;
    })
    .addCase(GetCryptoAction, (state, action) => {
      state.cryptoData = action.payload;
    })
    .addCase(GetMetricsAction, (state, action) => {
      state.metricsData = action.payload;
    })
    .addCase(GetWidgetsAction, (state, action) => {
      state.widgetsData = action.payload;
    })
    .addCase(GetHealthcareAction, (state, action) => {
      state.healthCare = action.payload;
    });
});

export default dashboardReducer;
