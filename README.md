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
1. **Dimensionality Reduction**: Identifying the top 50 genes based on correlation with the cancer variable. Comparing these to top genes given by logistic regression.
2. **Clustering**: Apply clustering to group samples and compare with true leukemia subtypes.

## Tools & Technologies
- **R** (for analysis and visualization)
- **tidyverse**, **dplyr**, **ggplot2** (for data manipulation, modeling, and visualization)

### Additional packages for Pranav to install
```
install.packages("pROC")
install.packages("caret")
```
