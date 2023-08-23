import React, { useEffect, useState } from 'react';
import AppGridContainer from '@crema/components/AppGridContainer';
import { Fonts } from '@crema/constants/AppEnums';
import { Box } from '@mui/material';
import BlogSidebar from './Sidebar';
import ProductContent from './Content';
import { Formik, Form } from 'formik';
import { getFormattedDate, getStringFromHtml } from '@crema/helpers';
import { onCreateProduct, onUpdateProduct } from '../../../../toolkit/actions';
import { useAppDispatch } from '../../../../toolkit/hooks';
import {
  ProductDataType,
  FileType,
  ProductInfoType,
} from '@crema/models/ecommerce/EcommerceApp';
import { TagType } from '@crema/models/ecommerce/EcommerceApp';
import { useRouter } from 'next/router';

type Props = {
  selectedProd?: ProductDataType | null;
};
export const AddEditProduct = ({ selectedProd }: Props) => {
  const dispatch = useAppDispatch();
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const router = useRouter();
  const [productInfo, setProductInfo] = React.useState<ProductInfoType[]>([
    { id: 1, title: '', desc: '' },
  ]);
  const [productSpec, setProductSpec] = React.useState<ProductInfoType[]>([
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
        initialValues={{
          ...selectedProd,
          category: selectedProd?.category || 1,
        }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (selectedProd) {
            const updatedProd = {
              ...selectedProd,
              ...data,
            };
            dispatch(onUpdateProduct(updatedProd));
            router.push('/ecommerce/product-listing');
          } else {
            const product = {
              ...data,
              description: getStringFromHtml(data.description as string),
              image: uploadedFiles?.map((file, index) => ({
                id: index,
                src: file.preview,
                rating: 0,
                reviews: 0,
              })),
              createdAt: getFormattedDate(),
              tag: selectedTags,
              productInfo,
              productSpec,
            };

            dispatch(onCreateProduct(product as ProductDataType));
            router.push('/ecommerce/product-listing');
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form noValidate autoComplete="off">
            <AppGridContainer>
              <ProductContent
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
