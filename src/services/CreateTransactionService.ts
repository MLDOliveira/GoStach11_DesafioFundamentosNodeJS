import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: RequestDTO): Transaction {
    if (data.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (data.value > balance.total) {
        throw Error('You have exceeded your balance limit');
      }
    }

    const transaction = this.transactionsRepository.create({
      title: data.title,
      value: data.value,
      type: data.type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
