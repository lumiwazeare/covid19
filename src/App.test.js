import { render, screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import App from "./App";

describe("Testing all component", ()=>{

  test('mockup data data is loading properly', async () => {
    render(<App />);
    const linkElement = screen.getByText("Loading....");
    expect(linkElement).toBeInTheDocument();
  
    await waitForElementToBeRemoved(()=>screen.getByText("Loading...."));
  });

  test('first list item Nigeria is display in header', async () => {
    render(<App />);
    const linkElement = await screen.findByText("Nigeria");
    expect(linkElement).toBeInTheDocument();
  });

  test('test if total values e.g first dose, total dose are all default to 0 if no value is returned', () => {
    render(<App />);
    const linkElement = screen.getAllByText("0");
    linkElement.forEach((data) => {
      expect(data).toBeInTheDocument();
    });
  
  });

  test('test if graph get updated when when the dose is change', async() => {
    render(<App />);

    await waitForElementToBeRemoved(()=>screen.getByText("Loading...."));

    const selectElement = screen.getByTestId("dose-change");
    fireEvent.change(selectElement, {target:{value:"firstDose"}});

    expect(selectElement).toHaveValue("firstDose");

  })


});

