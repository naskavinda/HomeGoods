import { useState, useEffect } from 'react';
import { 
  Box,
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  useMediaQuery,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from '@mui/material';
import { fetchProducts, createProduct } from '../../utils/api';
import { Product } from '../../types/product';

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name.trim()) {
      try {
        setIsSubmitting(true);
        const createdProduct = await createProduct({ name: newProduct.name });
        setProducts([...products, createdProduct]);
        setNewProduct({ name: '' });
        handleClose();
      } catch (err) {
        console.error('Failed to create product:', err);
        // Optionally add error handling UI here
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      py: { xs: 2, sm: 3, md: 4 }
    }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1"
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            Products
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Product
          </Button>
        </Box>
        
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {products?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ 
                  flexGrow: 1,
                  p: { xs: 2, sm: 3 },
                  '&:last-child': { pb: { xs: 2, sm: 3 } }
                }}>
                  <Typography 
                    variant="h6" 
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    {product.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                label="Product Name"
                fullWidth
                value={newProduct.name}
                onChange={(e) => setNewProduct({ name: e.target.value })}
                disabled={isSubmitting}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add'}
                </Button>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}

export default ProductListPage;
