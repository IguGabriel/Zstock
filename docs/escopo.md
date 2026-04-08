# ZStock - Escopo do Projeto

## Objetivo do sistema
O ZStock será um sistema de controle de estoque voltado para registrar entradas, saídas e ajustes de produtos, facilitando a gestão das mercadorias e reduzindo perdas operacionais.

O sistema terá uma interface simples, organizada e responsiva, buscando oferecer facilidade de uso até para usuários com pouca familiaridade com sistemas de estoque.

## Perfis de usuário
O sistema contará com 3 níveis de usuário:

- **ADMIN**: acesso total ao sistema.
- **Nível 1**: acesso amplo, com algumas restrições em funções mais sensíveis.
- **Nível 2**: acesso limitado a operações específicas e consultas.

## Módulos
- **Autenticação e acesso**  
  Responsável pelo login dos usuários e controle de permissões conforme o nível de acesso.

- **Gestão de produtos**  
  Cadastro, edição, consulta e inativação de produtos.

- **Gestão de fornecedores**  
  Cadastro e consulta de fornecedores.

- **Controle de estoque**  
  Registro de entradas, saídas e ajustes de estoque.

- **Histórico de movimentações**  
  Registro completo das movimentações realizadas no sistema, com usuário responsável, motivo e data/hora.

- **Dashboard**  
  Exibição de informações principais do sistema, como usuário logado, nível de acesso e alertas de estoque.

## Regras de negócio
- Não será permitido registrar entrada, saída ou ajuste sem motivo.
- Não será permitido cadastrar produto sem categoria e sem tipo de armazenamento.
- Não será permitido cadastrar dois produtos com o mesmo SKU.
- Produtos inativos não poderão receber novas movimentações.
- O estoque não poderá ficar negativo.
- Não será permitido realizar saída com quantidade maior que a disponível em estoque.
- Um produto será considerado com estoque baixo quando sua quantidade atual for menor ou igual ao estoque mínimo definido no cadastro.

## Entidades principais
- **Usuário**: responsável por acessar o sistema e realizar operações conforme seu nível de permissão.
- **Produto**: item controlado no estoque, contendo informações como código, descrição, SKU, categoria, tipo de armazenamento, estoque atual e estoque mínimo.
- **Fornecedor**: responsável pelo fornecimento dos produtos cadastrados.
- **Movimentação de estoque**: registro de entrada, saída ou ajuste relacionado a um produto, com quantidade, motivo, usuário responsável e data/hora.