 $(document).ready(function(){
    
      // Adicionamos o evento onclick ao botão com o ID "pesquisar"
      $('#pesquisar').on('click', function(e) {
        
        e.preventDefault();
        
        var cnpj = $('#inputCnpj').val().replace(/[^0-9]/g, '');
        
        // Fazemos uma verificação simples do cnpj confirmando se ele tem 14 caracteres
        if(cnpj.length == 14) {
        
          // Aqui rodamos o ajax para a url da API concatenando o número do CNPJ na url
          $.ajax({
            url:'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
            method:'GET',
            dataType: 'jsonp', // Em requisições AJAX para outro domínio é necessário usar o formato "jsonp" que é o único aceito pelos navegadores por questão de segurança
            complete: function(xhr){
            
              // Aqui recuperamos o json retornado
              response = xhr.responseJSON;
              
              // Na documentação desta API tem esse campo status que retorna "OK" caso a consulta tenha sido efetuada com sucesso
              if(response.status == 'OK') {
              
                // Agora preenchemos os campos com os valores retornados
                $('#inputRazao').val(response.nome);
                $('#inputFantasia').val(response.fantasia);
                $('#inputLogradouro').val(response.logradouro);
                $('#inputEmail').val(response.email);
                $('#inputFone').val(response.telefone);
                $('#inputCidade').val(response.municipio);
                $('#inputBairro').val(response.bairro);
                $('#inputNumero').val(response.numero);
                $('#inputUF').val(response.uf);
                    
              // Aqui exibimos uma mensagem caso tenha ocorrido algum erro
              } else {
                alert(response.message); // Neste caso estamos imprimindo a mensagem que a própria API retorna
              }
            }
          });
        
        // Tratativa para caso o CNPJ não tenha 14 caracteres
        } else {
          alert('CNPJ inválido');
        }
      });
    });