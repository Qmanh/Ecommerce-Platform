package com.dev.ecommerce.service;

import com.dev.ecommerce.model.Order;
import com.dev.ecommerce.model.Seller;
import com.dev.ecommerce.model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionBySellerId(Seller seller);
    List<Transaction> getAllTransactions();
}
