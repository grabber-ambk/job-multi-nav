import React, { useEffect, useState } from 'react';
import AppGridContainer from '@crema/components/AppGridContainer';
import { Fonts } from '@crema/constants/AppEnums';
import { Box } from '@mui/material';
import BlogSidebar from './Sidebar';
import BlogContent from './Content';
import { Formik, Form } from 'formik';
import { postDataApi, putDataApi } from '@crema/hooks/APIHooks';
import { useRouter } from 'next/router';
import { getFormattedDate, getStringFromHtml } from '@crema/helpers';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';
import {
  ProductDataType,
  ProductInfoType,
  ProductSpecType,
  TagType,
  FileType,
} from '@crema/models/ecommerce/EcommerceApp';

type Props = {
  selectedProd?: ProductDataType;
};

export const AddEditProduct = ({ selectedProd }: Props) => {
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const infoViewActionsContext = useInfoViewActionsContext();
  const router = useRouter();

  const [productInfo, setProductInfo] = React.useState<ProductInfoType[]>([
    { id: 1, title: '', desc: '' },
  ]);
  const [productSpec, setProductSpec] = React.useState<ProductSpecType[]>([
    { id: 1, title: '', desc: '' },
  ]);

  useEffect(() => {
    if (selectedProd) {
      setSelectedTags(selectedProd?.tag || []);
      setUploadedFiles(selectedProd?.image);
      setProductInfo(selectedProd?.productInfo || []);
      setProductSpec(selectedProd?.productSpec || []);
    }
  }, [selectedProd]);

  return (
    <>
      <Box
        component="h2"
        sx={{
          fontSize: 16,
          color: 'text.primary',
          fontWeight: Fonts.SEMI_BOLD,
          mb: {
            xs: 2,
            lg: 4,
          },
        }}
      >
        {selectedProd ? 'Edit Product' : 'Create a new product'}
      </Box>

      <Formik
        validateOnChange={true}
        initialValues={
          selectedProd
            ? {
                ...selectedProd,
                category: selectedProd?.category || 1,
              }
            : {
                title: '',
                SKU: '',
                category: 1,
                mrp: 0,
                salemrp: 0,
                discount: 0,
                description: '',
                inStock: false,
              }
        }
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedProd) {
            const updatedProd = {
              ...selectedProd,
              ...data,
            };
            putDataApi('/api/ecommerce/list/update', infoViewActionsContext, {
              product: updatedProd,
            })
              .then(() => {
                router.push('/ecommerce/product-listing');
                infoViewActionsContext.showMessage(
                  'Product updated successfully!'
                );
              })
              .catch((error) => {
                infoViewActionsContext.fetchError(error.message);
              });
          } else {
            postDataApi('/api/ecommerce/list/add', infoViewActionsContext, {
              product: {
                ...data,
                description: getStringFromHtml(data.description),
                image: uploadedFiles.map((file, index) => ({
                  id: index,
                  src: file.preview,
                  rating: 0,
                  reviews: 0,
                })),
                createdAt: getFormattedDate(),
                tag: selectedTags,
                productInfo,
                productSpec,
              },
            })
              .then(() => {
                infoViewActionsContext.showMessage(
                  'Product created successfully!'
                );
                router.push('/ecommerce/product-listing');
              })
              .catch((error) => {
                infoViewActionsContext.fetchError(error.message);
              });
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form noValidate autoComplete="off">
            <AppGridContainer>
              <BlogContent
                content={selectedProd?.description || ''}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                setFieldValue={setFieldValue}
              />
              <BlogSidebar
                isEdit={!!selectedProd}
                inStock={selectedProd?.inStock}
                selectedTags={selectedTags}
                productInfo={productInfo}
                productSpec={productSpec}
                setProductInfo={setProductInfo}
                setFieldValue={setFieldValue}
                setSelectedTags={setSelectedTags}
                setProductSpec={setProductSpec}
              />
            </AppGridContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddEditProduct;
