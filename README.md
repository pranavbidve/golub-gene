# Leukemia Subtype Classification Using Gene Expression Data

## Overview
This project aims to classify leukemia subtypes (AML and ALL) using the Golub Gene Expression Dataset. We will explore various data science techniques to identify significant genes, reduce dimensionality, and develop predictive models. The project integrates bioinformatics with machine learning to improve understanding and diagnosis of leukemia.

## Dataset
The Golub Gene Expression Dataset consists of:
- **Samples**: 72 patients (47 ALL, 25 AML)
- **Features**: Over 7,000 gene expression measurements

## Current Step: Exploratory Data Analysis (EDA)
In this phase, we focus on:
- Understanding the dataset’s structure.
- Visualizing gene expression distributions.
- Identifying missing or anomalous data points.

## Proposed Steps
1. **Dimensionality Reduction**: Use Principal Component Analysis (PCA) to reduce the feature space and identify patterns.
2. **Clustering**: Apply K-Means clustering to group samples and compare with true leukemia subtypes.
3. **Classification**: Build models (e.g., logistic regression) to predict leukemia subtypes and assess feature importance.
4. **Addressing Challenges**: Handle class imbalance, noisy data, and perform feature selection.

## Tools & Technologies
- **R** (for analysis and visualization)
- **tidyverse**, **dplyr**, **ggplot2** (for data manipulation, modeling, and visualization)
