
# POSTMAN #
 
http://localhost:8000

http://localhost:8000/rest/
#

http://localhost:8000/rest/sistema/
##

http://localhost:8000/rest/sistema/v1/
### Versão do sistema

http://localhost:8000/rest/sistema/v1/hospede/
#### Aqui acima, já é onde diferencia os módulos


# URL:

URL: http://localhost:8000/rest/sistema/v1/hospede/criar

# MÉTODOS (METHOD) NO POSTMAN:

# POST

Headers:
Content-Type: application/json

Body (raw JSON):
{
    "nomeHospede": "Lucas Silva",
    "cpf": "12345678901",
    "rg": "1234567",
    "sexo": "M",
    "dataNascimento": "1990-01-01",
    "email": "lucas.silva@email.com",
    "telefone": "31999999999",
    "tipo": 0,
    "ativo": 1
}

URL: http://localhost:8000/rest/sistema/v1/hospede/listar
Method: GET


URL:    http://localhost:8000/rest/sistema/v1/hospede/buscar/1
        http://localhost:8000/rest/sistema/v1/hospede/id
Method: GET


URL: http://localhost:8000/rest/sistema/v1/hospede/alterar/1
Method: PUT

Headers:
Content-Type: application/json

Body (raw JSON):
{
    "nomeHospede": "Lucas Silva Atualizado",
    "cpf": "12345678901",
    "rg": "1234567",
    "sexo": "M",
    "dataNascimento": "1990-01-01",
    "email": "lucas.atualizado@email.com",
    "telefone": "31999999999",
    "tipo": 0,
    "ativo": 1
}


URL: http://localhost:8000/rest/sistema/v1/hospede/excluir/1
Method: DELETE