import React, { useEffect } from "react";
import { Grid, Paper, Button, Typography } from "@mui/material";
import { Add, NotAccessible } from "@mui/icons-material";
import Category from "./components/Category";
import useCategories from "../api/hooks/useCategories";
import { useSelector, useDispatch } from "react-redux";
import { AddCategoryForm } from "../forms";
import { FormModal } from "../components";
import { toggleShowAddCategoryModal } from "../redux/slices/categories.slice";

import { ScaleLoader } from "react-spinners";

function Categories() {
  const { handleFetchCategories } = useCategories();
  const state = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(state.categories).length === 0) {
      handleFetchCategories();
    }
  }, []);
  return (
    <div>
      {state.loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <ScaleLoader color="#0F9D58" height={100} width={15} />
        </div>
      ) : (
        <div>
          <Button
            sx={{
              backgroundColor: "#0F9D58",
              margin: 1,
              ":hover": { backgroundColor: "#0F9D58c0" },
            }}
            endIcon={<Add />}
            variant="contained"
            onClick={() => dispatch(toggleShowAddCategoryModal())}
          >
            Add new Category
          </Button>
          <Paper sx={{ borderRadius: 1 }}>
            {state.categories.length > 0 ? (
              <Grid container spacing={0}>
                {state.categories.map((category, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Category category={category} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30vh",
                }}
              >
                <NotAccessible />
                <Typography variant="h6">
                  No Categories are avalibale
                </Typography>
              </div>
            )}
          </Paper>
        </div>
      )}
      <FormModal
        title="Add new category"
        open={state.showAddCategoryModal}
        handleClose={() => dispatch(toggleShowAddCategoryModal())}
      >
        <AddCategoryForm />
      </FormModal>
    </div>
  );
}

export default Categories;
