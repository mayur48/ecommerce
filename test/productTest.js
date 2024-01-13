const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); // Adjust the path according to your file structure
const should = chai.should();

chai.use(chaiHttp);

describe('Products', () => {
  // Test for creating a new product
  describe('/POST product', () => {
    it('it should create a new product', (done) => {
      let product = {
        name: "Test Product",
        description: "This is a test product",
        price: 100,
        variants: [
          { name: "Variant 1", sku: "var1", additionalCost: 10, stockCount: 15 }
        ]
      };

      chai.request(server)
        .post('/api/products')
        .send(product)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('description');
          res.body.should.have.property('price');
          res.body.variants.should.be.a('array');
          done();
        });
    });
  });

  // Test for retrieving all products
  describe('/GET products', () => {
    it('it should GET all the products', (done) => {
      chai.request(server)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/PUT product', () => {
    it('it should UPDATE a product given the id', (done) => {
        // First, create a product to update
        let product = new Product({
            name: "Test Product",
            description: "Original Description",
            price: 100,
            variants: []
        });

        product.save((err, product) => {
            chai.request(server)
                .put('/api/products/' + product.id)
                .send({name: "Test Product", description: "Updated Description", price: 150})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Product updated successfully');
                    res.body.product.should.have.property('description').eql('Updated Description');
                    done();
                });
        });
    });
});


describe('/DELETE product', () => {
  it('it should DELETE a product given the id', (done) => {
      let product = new Product({
          name: "Test Product",
          description: "Description",
          price: 100,
          variants: []
      });

      product.save((err, product) => {
          chai.request(server)
              .delete('/api/products/' + product.id)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Product successfully deleted');
                  res.body.result.should.have.property('ok').eql(1);
                  res.body.result.should.have.property('n').eql(1);
                  done();
              });
      });
  });
});
});